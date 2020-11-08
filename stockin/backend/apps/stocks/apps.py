from django.apps import AppConfig

from pathlib import Path
import sys
import os
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# sys.path.insert(0, BASE_DIR)

class StocksConfig(AppConfig):
    name = 'apps.stocks'
