# Module imports
from .dependencies import *

class GameObjectTransactionDao:
    def create(self,
        character: Character,
        obj: GameObject,
        quantity: int = 1,
        force: bool = False
    ) -> GameObjectTransaction:
        transaction = GameObjectTransaction()
        transaction.character_id = character.id
        transaction.obtained = { obj.id: quantity }
        transaction.max = { obj.id: obj.character_max_units }
        transaction.cost = {} if force else obj.cost
        transaction.prerequisites = {} if force else obj.prerequisites
        transaction.save()
        return transaction
    
    def fetch_for_character(self, character: Character) -> list[GameObjectTransaction]:
        return list(
            GameObjectTransaction.select().where(
                (GameObjectTransaction.character_id == character.id)
                & (GameObjectTransaction.deleted_at == None)
            )
        )
    
    def compute_transactions(self, character: Character) -> dict[int, int]:
        result: dict[int, int] = {}
        transactions = self.fetch_for_character(character)
        transactions.sort(key=lambda x: x.created_at)
        for transaction in transactions:
            valid = True
            obtained = transaction.obtained

            for id, qty in transaction.cost.items():
                if id not in result:
                    valid = False
                elif result[id] < qty:
                    valid = False
                else:
                    result[id] = result[id] - qty

            for id, qty in transaction.prerequisites.items():
                if id not in result:
                    valid = False
                elif result[id] < qty:
                    valid = False

            for id, max in transaction.max.items():
                current_units = result[id] if id in result else 0
                project_units = current_units + obtained[id]
                if project_units > max:
                    valid = False

            if not valid:
                transaction.soft_delete_instance()
                continue

            for id, qty in obtained.items():
                if id not in result:
                    result[id] = qty
                else:
                    result[id] = result[id] + qty

        return result