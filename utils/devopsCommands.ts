export const devopsCommands: { [key: string]: string } = {
    help: `
Available commands:
  - monitor: Check system metrics
  - log: View error logs
  - deploy: Simulate a deployment
  - rollback: Simulate a rollback
  - test: Run automated tests
  - scale: Simulate scaling resources
  - clear: Clear the terminal
`,
    monitor: "Monitoring system metrics...\nCPU usage: 45%\nMemory usage: 60%\nDisk space: 75% used",
    log: `Error logs:
[2023-05-15 14:30:22] ERROR: Database connection timeout
[2023-05-15 14:30:25] WARN: High memory usage detected
[2023-05-15 14:30:30] ERROR: API rate limit exceeded`,
    deploy: `Deploying application...
Step 1: Building application... Done
Step 2: Running unit tests... Passed
Step 3: Pushing to staging... Done
Step 4: Running integration tests... Passed
Step 5: Deploying to production... Done
Deployment completed successfully!`,
    rollback: `Initiating rollback procedure...
Step 1: Identifying last stable version... v2.1.0
Step 2: Stopping current version... Done
Step 3: Deploying v2.1.0... Done
Step 4: Running smoke tests... Passed
Rollback completed successfully!`,
    test: `Running automated tests...
Unit tests: 42/42 passed
Integration tests: 18/20 passed
End-to-end tests: 5/5 passed
Performance tests: 3/4 passed
Security tests: 7/7 passed
Overall test coverage: 94%`,
    scale: `Scaling resources...
Current load: 75%
Adding 2 new application instances...
Scaling database read replicas from 2 to 3...
Adjusting auto-scaling rules...
Resources scaled successfully!`,
    clear: '\x1Bc',
}

