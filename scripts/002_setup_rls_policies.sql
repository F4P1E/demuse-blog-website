-- Enable Row Level Security on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tag_relations ENABLE ROW LEVEL SECURITY;

-- Posts policies
-- Anyone can view published posts
CREATE POLICY "Anyone can view published posts"
  ON public.posts FOR SELECT
  USING (status = 'published');

-- Authors can view their own posts (any status)
CREATE POLICY "Authors can view their own posts"
  ON public.posts FOR SELECT
  USING (auth.uid() = author_id);

-- Authors can insert their own posts
CREATE POLICY "Authors can insert their own posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Authors can update their own posts
CREATE POLICY "Authors can update their own posts"
  ON public.posts FOR UPDATE
  USING (auth.uid() = author_id);

-- Authors can delete their own posts
CREATE POLICY "Authors can delete their own posts"
  ON public.posts FOR DELETE
  USING (auth.uid() = author_id);

-- Post categories policies
-- Anyone can view categories
CREATE POLICY "Anyone can view categories"
  ON public.post_categories FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can manage categories
CREATE POLICY "Authenticated users can insert categories"
  ON public.post_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON public.post_categories FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete categories"
  ON public.post_categories FOR DELETE
  TO authenticated
  USING (true);

-- Post tags policies
-- Anyone can view tags
CREATE POLICY "Anyone can view tags"
  ON public.post_tags FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can manage tags
CREATE POLICY "Authenticated users can insert tags"
  ON public.post_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tags"
  ON public.post_tags FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete tags"
  ON public.post_tags FOR DELETE
  TO authenticated
  USING (true);

-- Post tag relations policies
-- Anyone can view tag relations for published posts
CREATE POLICY "Anyone can view tag relations"
  ON public.post_tag_relations FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.posts
      WHERE posts.id = post_tag_relations.post_id
      AND posts.status = 'published'
    )
  );

-- Authors can manage tag relations for their own posts
CREATE POLICY "Authors can manage their post tag relations"
  ON public.post_tag_relations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.posts
      WHERE posts.id = post_tag_relations.post_id
      AND posts.author_id = auth.uid()
    )
  );
