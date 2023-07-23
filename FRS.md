# Functional Requirements Spec
This document describes the technical details behind features planned for the project. It's intended to lay out a general plan for developers, rather than describing user-facing features. This is essentially the FRS (Functional Requirements Spec) document for the project.

## Templating System
- Each entity/section in an ini file has a particular template, like Solar Objects or Zones. 
- When editing an object of a certain type, the property editor should be able to show all the properties of that type's template, and only save the ones that were edited. 
- Empty properties should not be saved to the file.

## Centralized global file state
- The state should be centralized in a single store for all tabs.
- Consumers may set it using a single global setter for the currently selected item's key/value.
- Consumers may process the state as long as the processing result is ultimately treated as immutable, and it must react to changes in the global state.
- Switching a file should be controlled by a context managing the tabs, which will hold a list of all currently open files.
- Undo will be handled internally per file.