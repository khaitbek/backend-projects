# Task Tracker

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

This is a simple command-line interface (CLI) application for managing tasks.

## Features

- Add new tasks with a unique ID and store it in `JSON` format.
- List tasks by their status: `todo`, `in-progress`, or `done`.
- Update the status, or the title of an existing task.
- Delete tasks by their ID.

## Prerequisites

- Rust installed on your system.

## Installation

**Clone the Repository**

```bash
git clone --depth=1 https://github.com/khaitbek/backend-projects

# Navigate to the project Directory
cd backend-projects/todo-cli
```

## Usage

- **Add a Task**

```bash
cargo run add "Drink a Coffee"
```

- **List all Tasks**

```bash
cargo run list
```

- **or by list the tasks by status**

```bash
# To list the tasks that are marked as todo
cargo run list --status=todo

# To list the tasks that are marked as in-progess
cargo run list --status=in-progress

# To list the tasks that are marked as done
cargo run list --status=done
```

- **Update a Task**

- **Update title**

```bash
cargo run update 1 --title="Drink a Coffee and Do Coding"
```

- **Update status**

```bash
cargo run update 1 --status="todo"
cargo run update 1 --status="in-progress"
cargo run update 1 --status="done"
```

- **Delete a Task**

```bash
# Delete the task by containing its ID 1
cargo run remove 1

# Delete tasks that have the status todo:
cargo run remove --status="todo"

# Delete tasks that have the status in-progress:
cargo run remove --status="in-progress"

# Delete tasks that have the status done:
cargo run remove --status="done"
```

### Sample JSON structure

```JSON
[
  {
      "id": 272954438,
      "title": "Task 1 - Complete Report",
      "status": "DONE",
      "created_at": "2024-09-02",
      "updated_at": "2024-09-02"
  }
]
```

> Note: Place the JSON file in the same directory as the task code.
