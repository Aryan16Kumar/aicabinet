
-- First, let's check if RLS is enabled and fix the policies
ALTER TABLE tools_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow public tool submissions" ON tools_submissions;
DROP POLICY IF EXISTS "Allow reading tool submissions" ON tools_submissions;

-- Create a proper policy that allows anyone to insert new tool submissions
CREATE POLICY "Enable public inserts for tool submissions" 
  ON tools_submissions 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create a policy for reading submissions (for admin/debugging purposes)
CREATE POLICY "Enable public reads for tool submissions" 
  ON tools_submissions 
  FOR SELECT 
  TO public
  USING (true);

-- Insert a test row to verify the setup is working
INSERT INTO tools_submissions (
  tool_name,
  tool_url,
  category,
  description,
  pricing,
  why_include,
  submitter_email
) VALUES (
  'Test Tool',
  'https://example.com',
  'Productivity',
  'This is a test tool submission to verify the form is working correctly.',
  'Free',
  'Testing the submission system',
  'test@example.com'
);
