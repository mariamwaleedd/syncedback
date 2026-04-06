import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwtejjvilzwbxzhanbyd.supabase.co'
const supabaseKey = 'sb_publishable_qzM2c6A6fQCMcbOgUN7kVg_T5GdRxrp'

export const supabase = createClient(supabaseUrl, supabaseKey)
