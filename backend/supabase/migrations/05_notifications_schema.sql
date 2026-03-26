-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID, -- Optional for MVP if no auth
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(50) DEFAULT 'Medium', -- 'High', 'Medium', 'Low'
    is_read BOOLEAN DEFAULT FALSE,
    target_link VARCHAR(255), -- Optional link to a task, client, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (for MVP/development)
CREATE POLICY "Enable all for public" ON public.notifications FOR ALL USING (true) WITH CHECK (true);
