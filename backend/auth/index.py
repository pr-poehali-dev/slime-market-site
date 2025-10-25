"""
Business: Регистрация, вход и управление пользователями
Args: event с httpMethod, body (username, email, password)
Returns: HTTP response с токеном или ошибкой
"""

import json
import os
import hashlib
import hmac
import base64
from typing import Dict, Any, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.environ.get('DATABASE_URL')
JWT_SECRET = os.environ.get('JWT_SECRET', 'default_secret')

def hash_password(password: str) -> str:
    """Хеширует пароль с использованием SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def create_token(user_id: int, username: str) -> str:
    """Создаёт простой JWT-подобный токен"""
    payload = f"{user_id}:{username}"
    signature = hmac.new(JWT_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()
    token = base64.b64encode(f"{payload}:{signature}".encode()).decode()
    return token

def verify_token(token: str) -> Optional[Dict[str, Any]]:
    """Проверяет токен и возвращает данные пользователя"""
    try:
        decoded = base64.b64decode(token.encode()).decode()
        parts = decoded.split(':')
        if len(parts) != 3:
            return None
        
        user_id, username, signature = parts
        expected_signature = hmac.new(
            JWT_SECRET.encode(), 
            f"{user_id}:{username}".encode(), 
            hashlib.sha256
        ).hexdigest()
        
        if signature == expected_signature:
            return {'user_id': int(user_id), 'username': username}
        return None
    except Exception:
        return None

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # CORS для всех запросов
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json'
    }
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': ''
        }
    
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            # РЕГИСТРАЦИЯ
            if action == 'register':
                username = body.get('username', '').strip()
                email = body.get('email', '').strip()
                password = body.get('password', '')
                
                if not username or not password:
                    return {
                        'statusCode': 400,
                        'headers': cors_headers,
                        'body': json.dumps({'error': 'Введи логин и пароль'})
                    }
                
                if len(password) < 6:
                    return {
                        'statusCode': 400,
                        'headers': cors_headers,
                        'body': json.dumps({'error': 'Пароль должен быть минимум 6 символов'})
                    }
                
                password_hash = hash_password(password)
                
                cursor.execute(
                    "INSERT INTO t_p76583320_slime_market_site.users (username, email, password_hash, balance) VALUES (%s, %s, %s, %s) RETURNING id, username, balance",
                    (username, email or '', password_hash, 1000)
                )
                user = cursor.fetchone()
                conn.commit()
                
                token = create_token(user['id'], user['username'])
                
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'isBase64Encoded': False,
                    'body': json.dumps({
                        'success': True,
                        'token': token,
                        'user': {
                            'username': user['username'],
                            'balance': user['balance']
                        }
                    })
                }
            
            # ВХОД
            elif action == 'login':
                username = body.get('username', '').strip()
                password = body.get('password', '')
                
                if not username or not password:
                    return {
                        'statusCode': 400,
                        'headers': cors_headers,
                        'body': json.dumps({'error': 'Введи логин и пароль'})
                    }
                
                password_hash = hash_password(password)
                
                cursor.execute(
                    "SELECT id, username, balance FROM t_p76583320_slime_market_site.users WHERE username = %s AND password_hash = %s",
                    (username, password_hash)
                )
                user = cursor.fetchone()
                
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': cors_headers,
                        'body': json.dumps({'error': 'Неверный логин или пароль'})
                    }
                
                token = create_token(user['id'], user['username'])
                
                return {
                    'statusCode': 200,
                    'headers': cors_headers,
                    'isBase64Encoded': False,
                    'body': json.dumps({
                        'success': True,
                        'token': token,
                        'user': {
                            'username': user['username'],
                            'balance': user['balance']
                        }
                    })
                }
        
        # ПРОВЕРКА ТОКЕНА
        elif method == 'GET':
            auth_token = event.get('headers', {}).get('X-Auth-Token', '')
            
            if not auth_token:
                return {
                    'statusCode': 401,
                    'headers': cors_headers,
                    'body': json.dumps({'error': 'Токен не найден'})
                }
            
            user_data = verify_token(auth_token)
            if not user_data:
                return {
                    'statusCode': 401,
                    'headers': cors_headers,
                    'body': json.dumps({'error': 'Неверный токен'})
                }
            
            cursor.execute(
                "SELECT username, balance FROM t_p76583320_slime_market_site.users WHERE id = %s",
                (user_data['user_id'],)
            )
            user = cursor.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': cors_headers,
                    'body': json.dumps({'error': 'Пользователь не найден'})
                }
            
            return {
                'statusCode': 200,
                'headers': cors_headers,
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'user': {
                        'username': user['username'],
                        'balance': user['balance']
                    }
                })
            }
        
        return {
            'statusCode': 405,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    except psycopg2.IntegrityError as e:
        conn.rollback()
        error_msg = 'Такой логин или email уже занят'
        return {
            'statusCode': 409,
            'headers': cors_headers,
            'body': json.dumps({'error': error_msg})
        }
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'})
        }
    finally:
        cursor.close()
        conn.close()