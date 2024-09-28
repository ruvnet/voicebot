# Instructions for Updating `app.py`

## Overview

This document provides detailed instructions on how to update the `app.py` file to import the `INTERVIEW_PROMPTS` dictionary from the newly created `prompts.py` file.

## Steps

1. **Remove the `INTERVIEW_PROMPTS` Dictionary from `app.py`**:
   - Open the `app.py` file.
   - Locate the `INTERVIEW_PROMPTS` dictionary definition.
   - Remove the entire dictionary definition from the file.

2. **Import the `INTERVIEW_PROMPTS` from `prompts.py`**:
   - At the top of the `app.py` file, add the following import statement:
     ```python
     from prompts import INTERVIEW_PROMPTS
     ```

3. **Ensure the Rest of the Code Remains Unchanged**:
   - Verify that the rest of the code in `app.py` remains unchanged and functions correctly with the imported `INTERVIEW_PROMPTS`.

## Example

Here is an example of the changes needed in `app.py`:

### Before

```python
# app.py

INTERVIEW_PROMPTS = {
    "default": "Hi, it's the AI Interview Bot powered by rUve...",
    "cloud_computing": "Welcome to the Cloud Computing interview...",
    "sales": "Welcome to the Sales interview...",
    # Other prompts...
}

# Rest of the code...
```

### After

```python
# app.py

from prompts import INTERVIEW_PROMPTS

# Rest of the code...
```

By following these steps, you will successfully update the `app.py` file to import the `INTERVIEW_PROMPTS` dictionary from the `prompts.py` file, improving code organization and maintainability.
