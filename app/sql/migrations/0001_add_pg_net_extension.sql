-- Add pg_net extension
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- Verify installation
SELECT extname, extversion FROM pg_extension WHERE extname = 'pg_net'; 