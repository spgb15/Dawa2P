#Permitir conectarme a una base de datos PostgreSQl
from ..general.config import Parametros
from ..general.logs import HandleLogs
from ..general.response import internal_response

import psycopg2
import psycopg2.extras
from psycopg2.extras import RealDictCursor

def conn_db():
    conn = psycopg2.connect(
        host=Parametros.db_host,
        port=int(Parametros.db_port),
        user=Parametros.db_user,
        password=Parametros.db_pass,
        database=Parametros.db_name,
        cursor_factory=RealDictCursor
    )
    conn.set_client_encoding('UTF8')
    return conn


class DataBaseHandle:
    @staticmethod
    def getRecords(query, tamanio, record=()):
        conn = None
        try:
            conn = conn_db()
            with conn.cursor() as cursor:
                if not record:
                    cursor.execute(query)
                else:
                    cursor.execute(query, record)

                if tamanio == 0:
                    res = cursor.fetchall()
                elif tamanio == 1:
                    res = cursor.fetchone()
                else:
                    res = cursor.fetchmany(tamanio)

            return internal_response(True, res, None)

        except Exception as ex:
            HandleLogs.write_error(ex)
            return internal_response(False, None, str(ex))

        finally:
            if conn:
                conn.close()

    @staticmethod
    def ExecuteNonQuery(query, record):
        conn = None
        try:
            conn = conn_db()
            with conn.cursor() as cursor:
                if len(record) == 0:
                    cursor.execute(query)
                else:
                    cursor.execute(query, record)

                if query.find('INSERT') > -1:
                    cursor.execute('SELECT LASTVAL()')
                    ult_id = cursor.fetchone()['lastval']
                    conn.commit()
                    return internal_response(True, ult_id, None)
                else:
                    return internal_response(True, 0, None)

        except Exception as ex:
            HandleLogs.write_error(ex)
            return internal_response(False, None, str(ex))

        finally:
            if conn:
                conn.close()