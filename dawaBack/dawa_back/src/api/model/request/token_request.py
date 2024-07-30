from marshmallow import Schema, fields


class TokenRequest(Schema):
    token = fields.String(required=True)

