#!/usr/bin/env node

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const matter = require('gray-matter');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const app = express();
const PORT = process.env.PORT || 3001;
const POSTS_DIR = path.join(__dirname, '_posts');
const ARCHIVE_DIR = path.join(__dirname, '_archive');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.access(POSTS_DIR);
  } catch {
    await fs.mkdir(POSTS_DIR, { recursive: true });
  }
  
  try {
    await fs.access(ARCHIVE_DIR);
  } catch {
    await fs.mkdir(ARCHIVE_DIR, { recursive: true });
  }
}

// Helper functions
function generateFilename(title, customSlug = null) {
  const slug = customSlug || title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return `${slug}.md`;
}

function createFrontMatter(data) {
  const frontMatter = {
    title: data.title,
  };
  
  if (data.date) {
    frontMatter.date = data.date;
  }
  
  if (data.coverImage) {
    frontMatter.cover_image = data.coverImage;
  }
  
  return matter.stringify(data.content || '', frontMatter);
}

// API Routes

// Get all published posts
app.get('/api/posts', async (req, res) => {
  try {
    const files = await fs.readdir(POSTS_DIR);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = path.join(POSTS_DIR, file);
          const content = await fs.readFile(filePath, 'utf8');
          const parsed = matter(content);
          
          return {
            filename: file,
            title: parsed.data.title,
            date: parsed.data.date,
            coverImage: parsed.data.cover_image,
            content: parsed.content,
            slug: file.replace(/\.md$/, ''),
            url: `/${file.replace(/\.md$/, '')}`
          };
        })
    );
    
    // Sort by date, newest first
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get all drafts
app.get('/api/drafts', async (req, res) => {
  try {
    const files = await fs.readdir(ARCHIVE_DIR);
    const drafts = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = path.join(ARCHIVE_DIR, file);
          const content = await fs.readFile(filePath, 'utf8');
          const parsed = matter(content);
          
          return {
            filename: file,
            title: parsed.data.title || file.replace('.md', ''),
            date: parsed.data.date,
            coverImage: parsed.data.cover_image,
            content: parsed.content,
            slug: file.replace(/\.md$/, ''),
            url: `/${file.replace(/\.md$/, '')}`
          };
        })
    );
    
    res.json(drafts);
  } catch (error) {
    console.error('Error fetching drafts:', error);
    res.status(500).json({ error: 'Failed to fetch drafts' });
  }
});

// Create new draft
app.post('/api/drafts', async (req, res) => {
  try {
    const { title, content, coverImage, slug } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const filename = generateFilename(title, slug);
    const filePath = path.join(ARCHIVE_DIR, filename);
    
    const fileContent = createFrontMatter({
      title,
      content: content || '',
      coverImage
    });
    
    await fs.writeFile(filePath, fileContent);
    
    res.json({ 
      success: true, 
      filename,
      message: 'Draft saved successfully' 
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ error: 'Failed to save draft' });
  }
});

// Publish post (create new or move from draft)
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, date, coverImage, fromDraft, slug } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const postDate = date || new Date().toISOString().split('T')[0];
    const filename = generateFilename(title, slug);
    const filePath = path.join(POSTS_DIR, filename);
    
    const fileContent = createFrontMatter({
      title,
      date: postDate,
      content: content || '',
      coverImage
    });
    
    await fs.writeFile(filePath, fileContent);
    
    // If publishing from draft, remove the draft
    if (fromDraft && fromDraft.filename) {
      const draftPath = path.join(ARCHIVE_DIR, fromDraft.filename);
      try {
        await fs.unlink(draftPath);
      } catch (error) {
        console.warn('Could not delete draft file:', error.message);
      }
    }
    
    res.json({ 
      success: true, 
      filename,
      message: 'Post published successfully' 
    });
  } catch (error) {
    console.error('Error publishing post:', error);
    res.status(500).json({ error: 'Failed to publish post' });
  }
});

// Update existing post
app.put('/api/posts/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { title, content, date, coverImage } = req.body;
    
    const filePath = path.join(POSTS_DIR, filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const fileContent = createFrontMatter({
      title,
      date,
      content: content || '',
      coverImage
    });
    
    await fs.writeFile(filePath, fileContent);
    
    res.json({ 
      success: true, 
      message: 'Post updated successfully' 
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Update existing draft
app.put('/api/drafts/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { title, content, coverImage } = req.body;
    
    const filePath = path.join(ARCHIVE_DIR, filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ error: 'Draft not found' });
    }
    
    const fileContent = createFrontMatter({
      title,
      content: content || '',
      coverImage
    });
    
    await fs.writeFile(filePath, fileContent);
    
    res.json({ 
      success: true, 
      message: 'Draft updated successfully' 
    });
  } catch (error) {
    console.error('Error updating draft:', error);
    res.status(500).json({ error: 'Failed to update draft' });
  }
});

// Unpublish post (move to drafts)
app.post('/api/posts/:filename/unpublish', async (req, res) => {
  try {
    const { filename } = req.params;
    const postPath = path.join(POSTS_DIR, filename);
    
    // Check if post exists
    try {
      await fs.access(postPath);
    } catch {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Read the post content
    const content = await fs.readFile(postPath, 'utf8');
    
    // Use the same filename for draft
    const draftPath = path.join(ARCHIVE_DIR, filename);
    
    // Move to drafts
    await fs.writeFile(draftPath, content);
    await fs.unlink(postPath);
    
    res.json({ 
      success: true, 
      message: 'Post moved to drafts' 
    });
  } catch (error) {
    console.error('Error unpublishing post:', error);
    res.status(500).json({ error: 'Failed to unpublish post' });
  }
});

// Delete draft
app.delete('/api/drafts/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(ARCHIVE_DIR, filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ error: 'Draft not found' });
    }
    
    await fs.unlink(filePath);
    
    res.json({ 
      success: true, 
      message: 'Draft deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting draft:', error);
    res.status(500).json({ error: 'Failed to delete draft' });
  }
});

// Get single post or draft
app.get('/api/posts/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(POSTS_DIR, filename);
    
    const content = await fs.readFile(filePath, 'utf8');
    const parsed = matter(content);
    
    res.json({
      filename,
      title: parsed.data.title,
      date: parsed.data.date,
      coverImage: parsed.data.cover_image,
      content: parsed.content
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(404).json({ error: 'Post not found' });
  }
});

app.get('/api/drafts/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(ARCHIVE_DIR, filename);
    
    const content = await fs.readFile(filePath, 'utf8');
    const parsed = matter(content);
    
    res.json({
      filename,
      title: parsed.data.title || filename.replace('.md', ''),
      date: parsed.data.date,
      coverImage: parsed.data.cover_image,
      content: parsed.content
    });
  } catch (error) {
    console.error('Error fetching draft:', error);
    res.status(404).json({ error: 'Draft not found' });
  }
});

// Deploy to GitHub
app.post('/api/deploy', async (req, res) => {
  try {
    console.log('Starting deployment process...');
    
    // Check git status
    const { stdout: gitStatus } = await execAsync('git status --porcelain');
    
    if (!gitStatus.trim()) {
      return res.json({ 
        success: true, 
        message: 'No changes to deploy',
        alreadyUpToDate: true 
      });
    }
    
    console.log('Changes detected:', gitStatus);
    
    // Add all changes
    await execAsync('git add .');
    console.log('Files added to git');
    
    // Create commit message
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const commitMessage = `Update blog posts - ${timestamp}

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`;
    
    // Commit changes
    await execAsync(`git commit -m "${commitMessage}"`);
    console.log('Changes committed');
    
    // Push to GitHub
    await execAsync('git push origin main');
    console.log('Changes pushed to GitHub');
    
    res.json({ 
      success: true, 
      message: 'Successfully deployed to GitHub! Changes will be live in a few minutes.',
      commitMessage: commitMessage.split('\n')[0]
    });
    
  } catch (error) {
    console.error('Deployment error:', error);
    
    // Handle specific Git errors
    let errorMessage = 'Deployment failed';
    
    if (error.message.includes('nothing to commit')) {
      return res.json({ 
        success: true, 
        message: 'No changes to deploy',
        alreadyUpToDate: true 
      });
    } else if (error.message.includes('not a git repository')) {
      errorMessage = 'This directory is not a Git repository';
    } else if (error.message.includes('remote rejected')) {
      errorMessage = 'GitHub rejected the push. Check permissions and repository settings.';
    } else if (error.message.includes('failed to push')) {
      errorMessage = 'Failed to push to GitHub. Check your internet connection and Git configuration.';
    }
    
    res.status(500).json({ 
      error: errorMessage,
      details: error.message 
    });
  }
});

// Start server
async function startServer() {
  await ensureDirectories();
  
  app.listen(PORT, () => {
    console.log(`Blog API running on http://localhost:${PORT}`);
    console.log(`Posts directory: ${POSTS_DIR}`);
    console.log(`Archive directory: ${ARCHIVE_DIR}`);
  });
}

startServer().catch(console.error);