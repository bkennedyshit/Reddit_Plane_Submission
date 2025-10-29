# Kiro Configuration

This directory contains Kiro-specific configurations and specifications for the BMX Challenge project.

## Directory Structure

### `/steering`
Contains project context and guidelines that are automatically included in Kiro's context:
- `project-context.md` - Overview of the BMX Challenge project, tech stack, and architecture

### `/specs`
Feature specifications following the spec-driven development workflow:
- Each feature gets its own subdirectory with `requirements.md`, `design.md`, and `tasks.md`

### `/settings`
Kiro settings and configurations (e.g., MCP configurations)

## Usage

### Creating a New Feature Spec
Ask Kiro to create a new spec for a feature, and it will guide you through:
1. Requirements gathering (user stories and acceptance criteria)
2. Design documentation (architecture, components, data models)
3. Implementation tasks (actionable coding checklist)

### Executing Tasks
Open any `tasks.md` file and click "Start task" next to individual tasks to have Kiro implement them.

### Steering Rules
The files in `/steering` are automatically included in Kiro's context to ensure consistency across all interactions with your project.
