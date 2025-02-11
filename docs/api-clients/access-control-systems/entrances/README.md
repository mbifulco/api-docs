---
description: Secured doors, gates, services, and other methods of entry
---

# Entrances

The `acs_entrance` object represents an [entrance](../../../products/access-systems/#access-system-components) within an [access control system](../../../products/access-systems/) (ACS).

## `acs_entrance` Properties

The `acs_entrance` object has the following properties:

<table><thead><tr><th width="309">Property</th><th width="114">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>acs_entrance_id</code></td><td>String<br><em>Required</em></td><td>ID of the entrance</td></tr><tr><td><code>display_name</code></td><td>String<br><em>Required</em></td><td>Display name for the entrance</td></tr><tr><td><code>acs_system_id</code></td><td>String<br><em>Required</em></td><td>ID of the access control system that contains the entrance</td></tr><tr><td><code>workspace_id</code></td><td>String<br><em>Required</em></td><td>ID of the <a href="../../../core-concepts/workspaces/">workspace</a> that contains the user</td></tr><tr><td><code>created_at</code></td><td>String<br><em>Required</em></td><td>Date and time at which the entrance was created</td></tr></tbody></table>

## `acs_entrance` Methods

You can perform the following actions on `acs_entrance` objects:

* [List entrances](list-entrances.md)
* [Get an entrance](get-an-entrance.md)
* [Grant a user access to an entrance](grant-a-user-access-to-an-entrance.md)
