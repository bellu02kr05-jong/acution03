from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase = create_client(url, key)

print("Checking for 'auction_items' table...")
try:
    # Try to select 1 row
    response = supabase.table("auction_items").select("id").limit(1).execute()
    print("Table 'auction_items' EXISTS!")
    print(response)
except Exception as e:
    print("Table 'auction_items' likely DOES NOT EXIST.")
    print(f"Error details: {e}")
