#!/usr/bin/env python3
"""
Generate seed data for daily_stocks table
Creates 300+ trading days of data for each stock (going back ~15 months)
Excludes weekends and holidays
"""

import datetime
import random
from typing import List, Tuple

# Stock configurations (stock_id, symbol, base_price, volatility)
STOCKS = [
    (1, "AAPL", 185.00, 0.02),    # Apple - moderate volatility
    (2, "MSFT", 375.00, 0.018),   # Microsoft - low volatility
    (3, "AMZN", 155.00, 0.025),   # Amazon - moderate volatility
    (4, "TSLA", 250.00, 0.045),   # Tesla - high volatility
    (5, "GOOGL", 145.00, 0.022),  # Alphabet - moderate volatility
    (6, "META", 360.00, 0.035),   # Meta - high volatility
    (7, "NVDA", 485.00, 0.055),   # NVIDIA - very high volatility
    (8, "NFLX", 485.00, 0.03),    # Netflix - moderate volatility
]


def is_trading_day(date: datetime.date) -> bool:
    """Check if a date is a trading day (weekday, excluding holidays)"""
    if date.weekday() >= 5:  # Saturday = 5, Sunday = 6
        return False

    # Exclude major US holidays (simplified)
    major_holidays = [
        (1, 1),   # New Year's Day
        (7, 4),   # Independence Day
        (12, 25),  # Christmas
    ]

    for month, day in major_holidays:
        if date.month == month and date.day == day:
            return False

    return True


def generate_trading_days(start_date: datetime.date, num_days: int) -> List[datetime.date]:
    """Generate trading days going backwards from start_date"""
    trading_days = []
    current_date = start_date

    while len(trading_days) < num_days:
        if is_trading_day(current_date):
            trading_days.append(current_date)
        current_date -= datetime.timedelta(days=1)

    return list(reversed(trading_days))  # Return in chronological order


def generate_stock_data(stock_id: int, symbol: str, base_price: float, 
                       volatility: float, dates: List[datetime.date]) -> List[Tuple]:
    """Generate OHLC data for a stock over given dates"""
    data = []
    current_price = base_price

    for date in dates:
        # Generate price movement
        daily_change = random.normalvariate(0, volatility)
        direction = 1 if random.random() > 0.5 else -1

        # Calculate OHLC
        open_price = current_price
        change_amount = open_price * daily_change * direction
        close_price = open_price + change_amount

        # Generate high/low with some randomness
        high_low_range = abs(change_amount) * random.uniform(1.2, 2.0)
        high_price = max(open_price, close_price) + \
            high_low_range * random.uniform(0.3, 0.8)
        low_price = min(open_price, close_price) - \
            high_low_range * random.uniform(0.3, 0.8)

        # Ensure logical price relationships
        high_price = max(high_price, open_price, close_price)
        low_price = min(low_price, open_price, close_price)

        # Convert to cents (integer)
        open_cents = int(open_price * 100)
        high_cents = int(high_price * 100)
        low_cents = int(low_price * 100)
        close_cents = int(close_price * 100)

        # Generate volume (varies by stock)
        base_volume = {
            1: 45000000,  # AAPL
            2: 25000000,  # MSFT
            3: 30000000,  # AMZN
            4: 40000000,  # TSLA
            5: 25000000,  # GOOGL
            6: 16000000,  # META
            7: 36000000,  # NVDA
            8: 7000000,   # NFLX
        }

        volume = int(base_volume.get(stock_id, 25000000)
                     * random.uniform(0.7, 1.5))

        # Calculate percentage change
        change_percent = (close_price - open_price) / open_price * 100

        data.append((
            stock_id,
            date.strftime('%Y-%m-%d'),
            open_cents,
            high_cents,
            low_cents,
            close_cents,
            volume,
            round(change_percent, 2)
        ))

        current_price = close_price

    return data


def generate_seed_file(output_file: str = "seed_daily_stocks.sql", num_days: int = 320):
    """Generate the complete seed file"""

    # Start from today and go back
    end_date = datetime.date.today()
    trading_days = generate_trading_days(end_date, num_days)

    with open(output_file, 'w') as f:
        f.write("-- Seed data for daily_stocks table\n")
        f.write(
            f"-- Generated {len(trading_days)} trading days of data per stock\n")
        f.write(f"-- Date range: {trading_days[0]} to {trading_days[-1]}\n")
        f.write(f"-- Total rows: {len(STOCKS) * len(trading_days)}\n\n")

        for stock_id, symbol, base_price, volatility in STOCKS:
            f.write(f"-- {symbol} - stock_id: {stock_id}\n")
            f.write(
                'INSERT INTO "daily_stocks" ("stock_id", "date", "open", "high", "low", "close", "volume", "change") VALUES\n')

            stock_data = generate_stock_data(
                stock_id, symbol, base_price, volatility, trading_days)

            for i, (sid, date, open_c, high_c, low_c, close_c, volume, change) in enumerate(stock_data):
                comma = "," if i < len(stock_data) - 1 else ";"
                f.write(
                    f"({sid}, '{date}', {open_c}, {high_c}, {low_c}, {close_c}, {volume}, {change}){comma}\n")

            f.write("\n")

    print(
        f"Generated {output_file} with {len(trading_days)} trading days for {len(STOCKS)} stocks")
    print(f"Total rows: {len(STOCKS) * len(trading_days)}")


if __name__ == "__main__":
    generate_seed_file("app/sql/seed_daily_stocks.sql", 320)
