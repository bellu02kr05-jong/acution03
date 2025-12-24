import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DATABASE_URL")
SCHEMA_FILE = "schema.sql"

def init_db():
    if not DB_URL:
        print("Error: DATABASE_URL not found in .env")
        return

    print("Connecting to Supabase Database...")
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        
        # Read Schema File
        with open(SCHEMA_FILE, "r", encoding="utf-8") as f:
            schema_sql = f.read()
            
        print("Executing Schema SQL...")
        cur.execute(schema_sql)
        conn.commit()
        
        print("✅ Database initialized successfully!")
        print("Created tables: auction_items, document_chunks")
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"Database initialization failed: {e}")

if __name__ == "__main__":
    init_db()
