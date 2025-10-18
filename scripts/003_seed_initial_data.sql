-- Insert default categories
INSERT INTO public.post_categories (name, slug, description) VALUES
  ('Technology', 'technology', 'Articles about technology, innovation, and digital trends'),
  ('Design', 'design', 'Creative design, UX/UI, and visual storytelling'),
  ('Culture', 'culture', 'Cultural insights, art, and creative expression'),
  ('Ideas', 'ideas', 'Thought-provoking concepts and philosophical explorations')
ON CONFLICT (slug) DO NOTHING;

-- Insert default tags
INSERT INTO public.post_tags (name, slug) VALUES
  ('AI', 'ai'),
  ('Machine Learning', 'machine-learning'),
  ('Web Development', 'web-development'),
  ('User Experience', 'user-experience'),
  ('Innovation', 'innovation'),
  ('Creativity', 'creativity'),
  ('Future', 'future'),
  ('Productivity', 'productivity')
ON CONFLICT (slug) DO NOTHING;
