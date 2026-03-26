-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID NOT NULL,
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    service_type VARCHAR(100) NOT NULL, -- e.g., 'Audit', 'GST', 'Advisory'
    billed_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    collected_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Paid', 'Overdue'
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_invoice_client FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (for MVP/development)
CREATE POLICY "Enable all for public" ON public.invoices FOR ALL USING (true) WITH CHECK (true);
