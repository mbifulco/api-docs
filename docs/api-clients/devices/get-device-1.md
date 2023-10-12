---
description: Get an Unmanaged Device by its ID
---

# Get Unmanaged Device

## Get a Device

{% swagger src="https://connect.getseam.com/openapi.json" path="/devices/unmanaged/get" method="post" expanded="false" fullWidth="false" %}
[https://connect.getseam.com/openapi.json](https://connect.getseam.com/openapi.json)
{% endswagger %}

### Code Example

{% tabs %}
{% tab title="Python" %}
```python
seam.devices.unmanaged.get("123e4567-e89b-12d3-a456-426614174000")

# Device(
#   device_id='a83690b2-2b70-409a-9a94-426699b84c97',
#   device_type='schlage_lock',
#   properties={
#     'manufacturer': 'schlage',
#     'name': 'GARAGE'
#     },
#   location=None,
#   capabilities_supported=[],
#   errors=[],
#   connected_account_id="9dcedcb3-5ede-4b66-9e07-f9ef97b3c29b",
#   workspace_id="f97073eb-c003-467a-965b-e6dba3a0131d"
#   )


```
{% endtab %}

{% tab title="Javascript" %}
```typescript
await seam.devices.unmanaged.get({ device_id: "123e4567-e89b-12d3-a456-426614174000" });

/*
{
  device_id: 'a83690b2-2b70-409a-9a94-426699b84c97',
  device_type: 'schlage_lock',
  capabilities_supported: [],
  properties: {
    manufacturer: 'schlage',
    name: 'GARAGE'
  },
  location: null,
  connected_account_id: 'b0be0837-29c2-4cb1-8560-42dfd07fb877',
  workspace_id: 'f97073eb-c003-467a-965b-e6dba3a0131d',
  created_at: '2022-08-24T11:14:37.116Z',
  errors: []
}
*/
```
{% endtab %}

{% tab title="Ruby" %}
```ruby
seam.devices.unmanaged.get("123e4567-e89b-12d3-a456-426614174000")

# <Seam::Device:0x00764f8
#   device_id="e002825a-27ee-4d74-9be3-45564b14c931"
#   device_type="smartthings_lock"
#   properties={
#     "manufacturer"=>"yale",
#     "name"=>"Yale Door Lock"}>
```
{% endtab %}
{% endtabs %}

### Parameters

| `device_id` | type: string | Device ID   |
| ----------- | ------------ | ----------- |
| `name`      | type: string | Device Name |

### Response

This section shows the JSON response returned by the API. Since each language encapsulates this response inside objects specific to that language and/or implementation, the actual type in your language might differ from what’s written here.

#### JSON format

{% tabs %}
{% tab title="JSON" %}
```json
{
  "device": {
    "device_id": "6b0afc38-7883-4efd-a31d-fccf6c04d809",
    "device_type": "schlage_lock",
    "capabilities_supported": [],
    "properties": {
      "manufacturer": "schlage",
      "name": "GARAGE"
    },
    "location": null,
    "connected_account_id": "9dcedcb3-5ede-4b66-9e07-f9ef97b3c29b",
    "workspace_id": "f97073eb-c003-467a-965b-e6dba3a0131d",
    "created_at": "2022-08-24T10:38:05.759Z",
    "errors": []
  },
  "ok": true
}
```
{% endtab %}
{% endtabs %}
