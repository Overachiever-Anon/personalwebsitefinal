-- Add description column to homepage_hero table
ALTER TABLE homepage_hero
ADD COLUMN description TEXT;

-- Update existing record with current description text
UPDATE homepage_hero
SET description = 'I''m passionate about pushing the boundaries of what''s possible through research and development. With expertise in AI, web development, and a love for gaming, I create solutions that blend technical excellence with user-centered design.'
WHERE id IN (SELECT id FROM homepage_hero LIMIT 1);

-- Set up RLS policy for the column
CREATE POLICY "Enable update for authenticated users only" 
ON homepage_hero
FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
