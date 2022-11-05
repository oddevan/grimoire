import { withApiAuth } from '@supabase/auth-helpers-nextjs'

export default withApiAuth(async function UserCollections(req, res, supabase) {
  // Run queries with RLS on the server
  const { data } = await supabase.from('test').select('*')
  res.json(data)
})