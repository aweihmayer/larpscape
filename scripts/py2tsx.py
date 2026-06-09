# Native imports
from datetime import datetime, date
from enum import Enum
import json
import os
from typing import get_args, get_origin, get_type_hints, Union
# Package imports
from core.model.base_model import BaseModel
from src import *

JS_TYPES = {
    'str': 'string',
    'int': 'number',
    'bool': 'boolean',
    'date': 'Date',
    'list': '[]'
}

CONSTANTS = {
    'config_id.tsx': ConfigId,
    'dimension.tsx': Dimension,
    'gender.tsx': Gender,
    'role.tsx': Role
}

DTOS = {
    'config_value_dto.tsx': ConfigValueDto,
    'user_dto.tsx': UserDto
}

MODELS: dict[str, type[BaseModel]] = {
    'config_value_model.tsx': ConfigValueModel,
    'user_model.tsx': UserModel
}

def write_if_not_exists(file: str, contents: str):
    if os.path.exists(file): return
    with open(file, 'w') as f: f.write(contents)
    print('Created', file)

def get_hint(hints, field: str) -> str:
    if isinstance(hints[field], Union):
        args = get_args(hints[field])
        arg = next(x for x in args if x is not type(None))
        if get_origin(arg) == list:
            underlying = get_args(arg)[0].__name__
            underlying = JS_TYPES.get(underlying, f'Constants.{underlying}')
            return underlying + '[]'
        else:
            hint = arg.__name__
    else:
        hint = hints[field].__name__
    
    return JS_TYPES.get(hint, f'Constants.{hint}')


def convert_constants():
    for file, constant in CONSTANTS.items():
        values = []
        for x in constant:
            v = f'\t{x.name} = {"'" + x.value + "'" if isinstance(x.value, str) else x.value}'
            values.append(v)

    write_if_not_exists(f'src/constants/{file}', (
f"""export enum {constant.__name__} {{
{',\n'.join(values)}
}}
"""))

def convert_dtos():
    for file, dto in DTOS.items():
        definitions = []
        setters = []
        hints = get_type_hints(dto)

        for field_name, field in dto._get_fields().items():
            hint = get_hint(hints, field_name)
            d = f"\t{field_name}?: {hint}"
            definitions.append(d)

            s = f"\t\tif (typeof data.{field_name} != 'undefined') dto.{field_name} = data.{field_name};"
            if hint == 'date':
                s = f"\t\tif (typeof data.{field_name} != 'undefined') dto.{field_name} = new Date(data.{field_name});"
            setters.append(s)

        write_if_not_exists(f'src/dtos/{file}', (
f"""import * as Constants from "@/src/constants";

export class {dto.__name__} {{
{'\n'.join(definitions)}

\tstatic fromJson(data: any) : {dto.__name__} {{
\t\tconst dto = new {dto.__name__}()
{'\n'.join(setters)}
\t\treturn dto;
\t}}
}}
"""
        ))

def convert_models():
    for file, model in MODELS.items():
        definitions = []
        inputs = []
        hints = get_type_hints(model)

        for field_name, field in model._get_fields().items():
            hint = get_hint(hints, field_name)
            d = f"\t{field_name}?: {hint}"
            definitions.append(d)

            input_params = []
            if field.options:
                input_params.append(f""" options: {json.dumps(field.options)}""")
            if field.min:
                pass #input_params.append(f""" min: {field.min}""")
            if field.max:
                input_params.append(f""" max: {field.max}""")
            inputs.append(f"""\t\t{field_name}: new Core.{type(field).__name__}({{{', '.join(input_params)}}})""")

        write_if_not_exists(f'src/models/{file}', (
f"""import * as Core from "@/core";
import * as Constants from "@/src/constants";

export class {model.__name__} {{
{'\n'.join(definitions)}

\tstatic fields = {{
{',\n'.join(inputs)}
\t}}
}}
"""
))

if __name__ == '__main__':
    convert_constants()
    convert_dtos()
    convert_models()