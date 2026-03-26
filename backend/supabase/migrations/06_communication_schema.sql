-- Create channels table
CREATE TABLE IF NOT EXISTS public.channels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID, -- Optional: link to a specific client
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'General', -- 'Client', 'Internal', 'General'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    channel_id UUID NOT NULL,
    user_id UUID, -- Placeholder for sender
    sender_name VARCHAR(100) NOT NULL,
    sender_avatar TEXT,
    content TEXT NOT NULL,
    is_ai_draft BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_msg_channel FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (for MVP/development)
CREATE POLICY "Enable all for public channels" ON public.channels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for public messages" ON public.messages FOR ALL USING (true) WITH CHECK (true);
