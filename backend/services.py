from models import Institution, Quiz


class InstitutionService:
    @staticmethod
    def get_all():
        return Institution.query.all()


class QuizService:
    @staticmethod
    def get_all():
        return Quiz.query.all()
