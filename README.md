# ElasticStack MCP Explorer

A premium, conversational chat interface for exploring and querying your Elasticsearch data using the Model Context Protocol (MCP).

## ✨ Features

- **Natural Language Querying**: Interact with your Elasticsearch data using plain English questions.
- **MCP Integration**: Uses the Model Context Protocol to seamlessly connect with LLMs and retrieve structured data.
- **Premium UI**: 
  - Modern, responsive design with dark mode aesthetics.
  - Interactive index management with multi-select and search capabilities.
  - Rich data visualization (cards, badges, and structured output).
- **Secure Architecture**:
  - Secure API proxy using Next.js API Routes to handle backend communication, preventing CORS issues and hiding internal endpoints.
- **Configurable**: Fully configurable via environment variables without touching the source code.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Lucide Icons)
- **Language**: TypeScript
- **State Management**: React Query (@tanstack/react-query)
- **Containerization**: Docker & Docker Compose

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional, for containerized run)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/elastic-stack-mcp.git
    cd elastic-stack-mcp
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory (or copy `.env.example` if available).

    ```env
    # Public Webhook Endpoint (Frontend usage)
    NEXT_PUBLIC_MCP_WEBHOOK_URL=https://imworkflow.intermesh.net/webhook/es_mcp

    # Frontend Wrapper Endpoint (Use the relative path for the internal proxy)
    NEXT_PUBLIC_INDEX_LIST_API_URL=/api/indices

    # Actual Backend Endpoint (Server-side usage only)
    ELASTIC_BACKEND_URL=http://10.84.85.37:8081/indices
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or port 3001 if configured) in your browser.

## 🐳 Running with Docker

1.  **Build and Start the Container:**
    ```bash
    docker compose up -d --build
    ```

2.  **Access the Application:**
    Open [http://localhost:3001](http://localhost:3001) in your browser.

    *Note: The port mapping is defined in `docker-compose.yml`. Ensure port 3001 is free.*

## 📂 Project Structure

- `src/app`: Next.js App Router pages and API routes.
  - `api/indices/route.ts`: Server-side proxy for fetching Elasticsearch indices.
  - `page.tsx`: Main chat interface.
- `src/components`: Reusable UI components.
  - `IndexSelector.tsx`: Advanced multi-select dropdown for indices.
  - `Chat/`: Chat components (ChatContainer, MessageBubble).
- `src/hooks`: Custom React hooks (useMCPChat, useIndices).
- `src/services`: API service layers.
- `src/utils`: Helper functions (e.g., response parser).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
