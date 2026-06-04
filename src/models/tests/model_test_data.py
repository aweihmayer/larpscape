# Native imports
from datetime import datetime, date, timedelta
# Package imports
from src.constants import *
from src.models import *

PRODUCTS = [
    ProductModel(
        name='Super VIP',
        price=1500,
        refund_duration=14,
        max_sold_units=1,
        summary='You will be treated like a king.',
        text='Grants access to all game with lunch included and special bonus in each game.'
    ),
    ProductModel(
        name='Unlimited membership',
        price=500,
        refund_duration=14,
        max_sold_units=None,
        summary='You will be treated like a king.',
        text='Grants access to all game with lunch included.'
    ),
    ProductModel(
        name='Chapter 1 pass',
        price=50,
        refund_duration=14,
        max_sold_units=50,
        summary='Grants access to chapter 1 event.',
        text="Don't miss out on the first part of the story! Lunch included."
    ),
    ProductModel(
        name='Chapter 2 pass',
        price=50,
        refund_duration=14,
        max_sold_units=50,
        summary='Grants access to chapter 2 event.',
        text="Don't miss out on the second part of the story! Lunch included."
    ),
    ProductModel(
        name='Chapter 3 pass',
        price=50,
        refund_duration=14,
        max_sold_units=50,
        summary='Grants access to chapter 3 event.',
        text="Don't miss out on the last part of the story! Lunch included."
    )
]

EVENTS = [
    EventModel(
        name='Chapter 1 - Reign of Terror',
        start=datetime.now() + timedelta(days=-30),
        end=datetime.now() + timedelta(days=-28),
        summary='The emperor is not giving up his iron grip. Hard times are ahead.',
        text='The immortal emperor has been ruling for a thousand year now. His greed and arrogance knows no limits and he will stop at nothing to crush the rebellion.'
    ),
    EventModel(
        name='Chapter 2 - Fall of the Empire',
        start=datetime.now() + timedelta(days=30),
        end=datetime.now() + timedelta(days=32),
        summary='The emperor has been defeated and the world is reborn.',
        text='At long last, a group of brave heroes.= has thwarted the evil emperor and brought his reign to an end. A new dawn await with fragile alliances.'
    ),
    EventModel(
        name='Chapter 3 - The End Times',
        start=datetime.now() + timedelta(days=60),
        end=datetime.now() + timedelta(days=62),
        summary='Oops, we spoke too soon. The world is ending again.',
        text='Turns out killing the emperor activated the prophecy for the apocalypse. How would we have known!'
    )
]

USERS = [
    UserModel(
        username = 'alex.bot',
        email='alex@email.com',
        first_name='Alex',
        last_name='Bolduc',
        gender=Gender.MALE,
        date_of_birth=date(1990, 1, 1),
        password='password123!'
    ),
    UserModel(
        username = 'bob.bot',
        email='bob@email.com',
        first_name='Bob',
        last_name='Smith',
        gender=Gender.MALE,
        date_of_birth=date(2000, 1, 1),
        password='password321!'
    ),
    UserModel(
        username = 'charlotte.bot',
        email='charlotte@email.com',
        first_name='Charlotte',
        last_name='Hamilton',
        gender=Gender.FEMALE,
        date_of_birth=date(2010, 1, 1),
        password='password213!'
    )
]

CHARACTERS = [
    CharacterModel(
        name='Grog',
        text='A fine warrior.'
    ),
    CharacterModel(
        name='Lyra',
        text='A wandering mage who studies forgotten runes.'
    ),
    CharacterModel(
        name='Thorn',
        text='A silent ranger with unmatched aim in the wilds.'
    ),
    CharacterModel(
        name='Seraphine',
        text='A noble cleric devoted to healing the wounded.'
    ),
    CharacterModel(
        name='Durn',
        text='A stubborn dwarf blacksmith who crafts legendary weapons.'
    ),
    CharacterModel(
        name='Kael',
        text='A rogue who survives through charm and quick reflexes.'
    ),
    CharacterModel(
        name='Mira',
        text='An alchemist fascinated by dangerous potions and experiments.'
    ),
    CharacterModel(
        name='Vex',
        text='A mysterious assassin known only through whispered rumors.'
    ),
    CharacterModel(
        name='Eldric',
        text='An aging knight seeking redemption for past failures.'
    )
]

GAME_OBJECTS = [
    GameObjectModel(
        name='Gold coins',
        auto_link_keyword='[Gold coins]',
        is_obtainable=True,
        auto_obtain=False,
        character_max_units=999,
        character_starting_units=10,
        contents='Currency to buy items'
    ),
    GameObjectModel(
        name='Gold bar',
        auto_link_keyword='[Gold bar]',
        is_obtainable=True,
        auto_obtain=False,
        character_max_units=999,
        character_starting_units=0,
        contents='Product from [Gold coins]'
    )
]