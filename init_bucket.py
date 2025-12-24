from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

# Admin Client (using Secret Key)
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

print(f"Connecting to {url} with Secret Key...")
supabase = create_client(url, key)

try:
    print("Attempting to create bucket 'auction-files'...")
    # options={"public": True} for public access to images
    res = supabase.storage.create_bucket("auction-files", options={"public": True})
    print(f"Bucket Created: {res}")
except Exception as e:
    print(f"Bucket Creation Failed (or already exists): {e}")

try:
    buckets = supabase.storage.list_buckets()
    print("Current Buckets:", buckets)
except Exception as e:
    print(e)
