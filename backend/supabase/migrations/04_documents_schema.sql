-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID NOT NULL,
    task_id UUID, -- Optional link to a specific task
    filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- e.g., 'PDF', 'DOCX', 'XLSX'
    file_size_kb INTEGER NOT NULL DEFAULT 0,
    version INTEGER NOT NULL DEFAULT 1,
    priority VARCHAR(50) DEFAULT 'Normal', -- 'Urgent', 'Normal', 'Archived'
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploaded_by VARCHAR(100),
    storage_path TEXT NOT NULL,
    CONSTRAINT fk_doc_client FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE CASCADE,
    CONSTRAINT fk_doc_task FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON DELETE SET NULL
);

-- Note: Actual files will be stored in Supabase Storage buckets (e.g., 'vault')
-- Ensure your Supabase Storage bucket is created and RLS is configured.

-- Enable RLS for database metadata
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (for MVP/development)
CREATE POLICY "Enable all for public" ON public.documents FOR ALL USING (true) WITH CHECK (true);
