import { supabase } from './supabase.js'

export async function fetchProjects() {
  const { data, error } = await supabase.from('projects').select('*')
  if (error) throw error
  return data
}

export async function fetchProjectById(id) {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
  if (error) throw error
  return data
}
