# Know You Better - Adolescent Psychological Counseling Platform

A comprehensive mental health platform designed specifically for adolescents, featuring AI-powered psychological analysis, professional counseling services, and a supportive community environment.

## 🌟 Features

### 🧠 AI Psychological Analysis
- **House-Tree-Person Drawing Analysis**: Upload drawings for AI-powered psychological insights
- **Detailed Reports**: Comprehensive personality and emotional state analysis
- **Personalized Recommendations**: Tailored mental health advice and resources

### 💬 Professional Counseling
- **Online Consultations**: Text and video sessions with licensed counselors
- **Appointment Scheduling**: Easy booking system with counselor selection
- **Secure Communication**: HIPAA-compliant messaging and video calls

### 📚 Knowledge Base
- **Educational Content**: Articles, videos, and interactive courses
- **Mental Health Topics**: Growing pains, emotional regulation, stress management
- **Parent Resources**: Guidance for supporting adolescent mental health

### 👥 Community Support
- **Anonymous Forum**: Safe space for peer support and discussion
- **Expert Guidance**: Professional moderators and periodic expert responses
- **Reward System**: Points for participation and helpful contributions

### 🔒 Privacy & Security
- **End-to-End Encryption**: All communications and data are secured
- **Anonymous Options**: Users can participate without revealing identity
- **GDPR Compliant**: Full compliance with privacy regulations

## 🌍 Multi-Language Support

- **English** (Primary)
- **Simplified Chinese** (简体中文)
- **Traditional Chinese** (繁體中文)

## 🚀 Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Internationalization**: next-intl for multi-language support
- **Authentication**: NextAuth.js with multiple providers
- **Database**: Prisma with PostgreSQL
- **Deployment**: Vercel with optimized build configuration
- **UI Components**: Radix UI primitives with custom styling

## 🎨 Design Philosophy

### Color Palette
- **Primary Blue**: Calming and trustworthy (#0ea5e9)
- **Secondary Green**: Growth and healing (#22c55e)
- **Warm Yellow**: Optimism and energy (#eab308)
- **Sage Green**: Balance and tranquility (#5f7a5f)
- **Calm Gray**: Stability and neutrality (#64748b)

### Typography
- **Display Font**: Poppins (headings and emphasis)
- **Body Font**: Inter (readable and modern)

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop computers (1440px+)
- Tablets (768px - 1439px)
- Mobile devices (320px - 767px)

## 🏥 Mental Health Focus

### Target Audience
- **Primary**: Adolescents (13-18 years old)
- **Secondary**: Parents and guardians
- **Tertiary**: Mental health professionals

### Key Mental Health Areas
- Anxiety and stress management
- Depression and mood disorders
- Social anxiety and relationship issues
- Academic pressure and performance anxiety
- Identity development and self-esteem
- Family relationship challenges
- Peer pressure and social dynamics

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd know-you-better
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/knowyoubetter"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI Services
OPENAI_API_KEY="your-openai-api-key"

# File Upload
CLOUDINARY_URL="your-cloudinary-url"
```

### Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 📦 Deployment

### Vercel (Recommended)

1. **Connect your repository**
   - Import project to Vercel
   - Configure environment variables
   - Deploy automatically on push

2. **Custom Domain**
   ```bash
   # Add your domain in Vercel dashboard
   # Configure DNS records as instructed
   ```

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

### Development Guidelines
1. Follow the existing code style and patterns
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation as needed
5. Ensure accessibility compliance

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation support

## 📊 Analytics & Monitoring

### User Analytics
- Page views and user sessions
- Feature usage tracking
- User journey analysis
- Performance monitoring

### Mental Health Metrics
- Assessment completion rates
- Counselor session attendance
- Community engagement levels
- User satisfaction scores

## 🆘 Crisis Support

### Emergency Resources
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **International**: Links to local crisis resources

### Platform Safety
- Automatic crisis detection in user communications
- Direct connection to emergency services when needed
- 24/7 crisis counselor availability
- Mandatory reporter protocols for licensed staff

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Mental health professionals who provided guidance
- Open source community for amazing tools and libraries
- Beta testers and early users for valuable feedback
- Adolescent mental health researchers and advocates

## 📞 Support

For technical support or questions about the platform:
- **Email**: support@knowyoubetter.com
- **Documentation**: [docs.knowyoubetter.com]
- **Community Forum**: Available within the platform

---

**Important**: This platform is designed to supplement, not replace, professional mental health care. Users experiencing severe mental health crises should contact emergency services or speak with a licensed mental health professional immediately.
