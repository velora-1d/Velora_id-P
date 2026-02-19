-- ============================================
-- VELORA DATABASE MIGRATION — PHASE 3
-- Run this in Supabase SQL Editor
-- Adds `bio` column as alias for backward compatibility
-- ============================================

-- Add 'bio' column to founder table if it doesn't exist
-- This ensures backward compatibility with admin forms
-- that may have saved data under the 'bio' field name
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'founder' AND column_name = 'bio'
    ) THEN
        ALTER TABLE founder ADD COLUMN bio JSONB DEFAULT '[]';
    END IF;
END $$;

-- Sync existing bio_paragraphs data to bio column (if bio is empty)
UPDATE founder
SET bio = bio_paragraphs
WHERE bio IS NULL OR bio = '[]'::jsonb;
