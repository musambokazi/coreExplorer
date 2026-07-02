import os
import unittest

os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")

from app import create_app
from models import Institution, Subject, Resource, db


class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config.update(
            TESTING=True,
            SQLALCHEMY_DATABASE_URI="sqlite:///:memory:",
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
        )
        self.client = self.app.test_client()

        with self.app.app_context():
            db.drop_all()
            db.create_all()
            db.session.add(
                Institution(
                    name="Test University",
                    province="Gauteng",
                    institution_type="University",
                )
            )
            db.session.add(
                Subject(name="Biology", description="Study life and living systems.", value_tag="people")
            )
            db.session.add(
                Resource(
                    title="How Biology helps communities",
                    description="A short introduction to community-based science.",
                    resource_type="article",
                    url="https://example.com/biology",
                    value_tag="people",
                )
            )
            db.session.commit()

    def test_institutions_endpoint_returns_data(self):
        response = self.client.get("/api/institutions")

        self.assertEqual(response.status_code, 200)
        payload = response.get_json()
        self.assertIsInstance(payload, list)
        self.assertGreaterEqual(len(payload), 1)
        self.assertEqual(payload[0]["name"], "Test University")

    def test_subjects_endpoint_returns_data(self):
        response = self.client.get("/api/subjects?path=people")

        self.assertEqual(response.status_code, 200)
        payload = response.get_json()
        self.assertIsInstance(payload, list)
        self.assertGreaterEqual(len(payload), 1)
        self.assertEqual(payload[0]["name"], "Biology")

    def test_resources_endpoint_returns_data(self):
        response = self.client.get("/api/resources?path=people")

        self.assertEqual(response.status_code, 200)
        payload = response.get_json()
        self.assertIsInstance(payload, list)
        self.assertGreaterEqual(len(payload), 1)
        self.assertEqual(payload[0]["title"], "How Biology helps communities")


if __name__ == "__main__":
    unittest.main()
