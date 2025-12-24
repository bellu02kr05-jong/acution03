from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

print(f"Testing connection to: {url}")

try:
    supabase = create_client(url, key)
    # Try a simple authenticated request (even if table doesn't exist, it checks auth)
    # Querying a non-existent table usually returns 404 but confirms server reachable
    response = supabase.table("non_existent_table").select("*").limit(1).execute()
    print("REST API Reachable!")
    print(response)
except Exception as e:
    print(f"REST API connection failed: {e}")
