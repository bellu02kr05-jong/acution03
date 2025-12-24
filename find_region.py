import psycopg2
import sys

# Configuration
PASSWORD = "whddufWkd83!"
PROJECT_REF = "wabkriofaedmqrklyyan"
USER = f"postgres.{PROJECT_REF}"

# Common Global Regions
REGIONS = {
    "US East (N. Virginia)": "aws-0-us-east-1.pooler.supabase.com",
    "US West (N. California)": "aws-0-us-west-1.pooler.supabase.com",
    "EU Central (Frankfurt)": "aws-0-eu-central-1.pooler.supabase.com",
    "EU West (London)": "aws-0-eu-west-2.pooler.supabase.com"
}

def check_connection(region_name, host):
    dsn = f"postgresql://{USER}:{PASSWORD}@{host}:6543/postgres?sslmode=require"
    print(f"Probing {region_name} ({host})...")
    try:
        conn = psycopg2.connect(dsn, connect_timeout=5)
        conn.close()
        print(f"SUCCESS! Found project in {region_name}")
        return host
    except psycopg2.OperationalError as e:
        msg = str(e)
        if "password" in msg: 
            # Password error means we found the tenant but password is wrong (Good sign for region)
            print(f"FOUND TENANT in {region_name} (Password mismatch?)")
            return host
        elif "Tenant or user not found" in msg:
            print(f"Not in {region_name}")
        elif "could not translate host name" in msg:
            print(f"DNS Error for {region_name}")
        else:
            print(f"Error in {region_name}: {msg}")
    return None

found_host = None
for name, host in REGIONS.items():
    if check_connection(name, host):
        found_host = host
        break

if found_host:
    print(f"TARGET_HOST={found_host}")
else:
    print("Could not find project in common AP regions.")
