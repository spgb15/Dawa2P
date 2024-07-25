import psycopg2
import psycopg2.extras
from psycopg2.extras import RealDictCursor
from ..general.config import Parametros
from ..general.logs import HandleLogs
from ..general.response import internal_response

def conn_db():
    return psycopg2.connect(
        host=Parametros.db_host,
        port=int(Parametros.db_port),
        user=Parametros.db_user,
        password=Parametros.db_pass,
        dbname=Parametros.db_name,
        cursor_factory=RealDictCursor
    )

class DatabaseHandle:
    @staticmethod
    def getRecords(query, tamanio, record=()):
        result = False
        data = None
        Message = None
        conn = None
        cursor = None
        try:
            conn = conn_db()
            cursor = conn.cursor()
            if len(record) == 0:
                cursor.execute(query)
            else:
                cursor.execute(query, record)

            if tamanio == 0:
                res = cursor.fetchall()
            elif tamanio == 1:
                res = cursor.fetchone()
            else:
                res = cursor.fetchmany(tamanio)

            result = True
            data = res

            return internal_response(result, data, Message)

        except Exception as ex:
            HandleLogs.write_error(ex)
            return internal_response(False, ex.__str__(), None)

        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    @staticmethod
    def executeNonQuery(query, record):
        conn = None
        cursor = None
        try:
            conn = conn_db()
            cursor = conn.cursor()

            if len(record) == 0:
                cursor.execute(query)
            else:
                cursor.execute(query, record)

            if query.find('INSERT') > -1:
                cursor.execute('SELECT LASTVAL()')
                ult_id = cursor.fetchone()['lastval']
                conn.commit()
                return internal_response(True, None, ult_id)
            else:
                conn.commit()
                return internal_response(True, None, 0)

        except Exception as ex:
            HandleLogs.write_error(ex)
            return internal_response(False, ex.__str__(), None)

        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
