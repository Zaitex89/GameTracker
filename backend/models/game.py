# Model — Describes how the data looks like in the DB
from config.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    platform = Column(String, nullable=False)
    genre = Column(String, nullable=False)
    status = Column(String, nullable=False)
    rating = Column(Integer, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False,
                        server_default=text("now()"))