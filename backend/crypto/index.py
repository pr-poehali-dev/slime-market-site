import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import jwt
from typing import Dict, Any

DATABASE_URL = os.environ.get('DATABASE_URL')
JWT_SECRET = os.environ.get('JWT_SECRET')
CRYPTO_CREATION_COST = 50000

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Создание собственной криптовалюты пользователем за 50000 валюты
    Args: event - dict с httpMethod, body, headers
          context - объект с request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        token = event.get('headers', {}).get('X-Auth-Token') or event.get('headers', {}).get('x-auth-token')
        
        if not token:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Требуется авторизация'})
            }
        
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            user_id = payload.get('user_id')
        except jwt.InvalidTokenError:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Неверный токен'})
            }
        
        body_data = json.loads(event.get('body', '{}'))
        crypto_name = body_data.get('name', '').strip()
        crypto_symbol = body_data.get('symbol', '').strip().upper()
        initial_supply = body_data.get('initial_supply', 0)
        
        if not crypto_name or not crypto_symbol:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Укажите название и символ криптовалюты'})
            }
        
        if len(crypto_symbol) > 10:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Символ не может быть длиннее 10 символов'})
            }
        
        if initial_supply <= 0:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Начальное количество должно быть больше 0'})
            }
        
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT balance FROM t_p76583320_slime_market_site.users WHERE id = %s" % user_id
        )
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Пользователь не найден'})
            }
        
        if user['balance'] < CRYPTO_CREATION_COST:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'Недостаточно средств. Требуется {CRYPTO_CREATION_COST} валюты'})
            }
        
        cur.execute(
            "SELECT id FROM t_p76583320_slime_market_site.cryptocurrencies WHERE symbol = '%s'" % crypto_symbol
        )
        existing_crypto = cur.fetchone()
        
        if existing_crypto:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Криптовалюта с таким символом уже существует'})
            }
        
        cur.execute(
            "UPDATE t_p76583320_slime_market_site.users SET balance = balance - %s WHERE id = %s" % (CRYPTO_CREATION_COST, user_id)
        )
        
        cur.execute(
            "INSERT INTO t_p76583320_slime_market_site.cryptocurrencies (name, symbol, initial_supply, creator_id) VALUES ('%s', '%s', %s, %s) RETURNING id, created_at" % (
                crypto_name.replace("'", "''"),
                crypto_symbol.replace("'", "''"),
                initial_supply,
                user_id
            )
        )
        new_crypto = cur.fetchone()
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'crypto': {
                    'id': new_crypto['id'],
                    'name': crypto_name,
                    'symbol': crypto_symbol,
                    'initial_supply': initial_supply,
                    'created_at': str(new_crypto['created_at'])
                },
                'new_balance': user['balance'] - CRYPTO_CREATION_COST
            })
        }
    
    if method == 'GET':
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute(
            "SELECT c.id, c.name, c.symbol, c.initial_supply, c.created_at, u.username as creator FROM t_p76583320_slime_market_site.cryptocurrencies c JOIN t_p76583320_slime_market_site.users u ON c.creator_id = u.id ORDER BY c.created_at DESC"
        )
        cryptos = cur.fetchall()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'cryptocurrencies': [
                    {
                        'id': c['id'],
                        'name': c['name'],
                        'symbol': c['symbol'],
                        'initial_supply': c['initial_supply'],
                        'creator': c['creator'],
                        'created_at': str(c['created_at'])
                    } for c in cryptos
                ]
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }
