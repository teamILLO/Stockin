#!/bin/bash

echo $(date '+%Y-%m-%d %H:%M')
source /home/ubuntu/env_name/bin/activate
python /home/ubuntu/swpp2020-team15/stockin/backend/core/crawlers/StockCrawler.py realtime
deactivate
