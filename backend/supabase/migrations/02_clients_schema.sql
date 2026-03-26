-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    service_type VARCHAR(100), -- E.g., 'Tax Audit', 'GST Return', 'Advisory'
    status VARCHAR(50) DEFAULT 'Active', -- 'Active', 'Inactive', 'Onboarding'
    priority VARCHAR(50) DEFAULT 'Medium', -- 'High', 'Medium', 'Low'
    compliance_score INTEGER DEFAULT 100, -- e.g., 0-100 indicating health/compliance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (for MVP/development)
CREATE POLICY "Enable all for public" ON public.clients FOR ALL USING (true) WITH CHECK (true);

-- Add foreign key constraint to tasks if client_id exists
-- (Assuming tasks table is already created from 01_tasks_schema.sql)
ALTER TABLE public.tasks
  ADD CONSTRAINT fk_tasks_client
  FOREIGN KEY (client_id)
  REFERENCES public.clients(id)
  ON DELETE SET NULL;
