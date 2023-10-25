---
description: >-
  Learn about the specific requirements and constraints for setting access codes
  on door locks.
---

# Access code requirements for door locks

Some models of door locks have specific requirements and constraints when it comes to setting PIN codes. It's essential to be aware of these to ensure seamless functionality and security. The requirements can be fetched by making a [Get Device](../../../api-clients/devices/get-device.md) or [List Devices](../../../api-clients/devices/list-devices.md) request.

Sample set of access code requirements:

```json
{
  "device": {
    "device_id": "00000000-0000-0000-0000-000000000000",
    "capabilities_supported": [
      "access_code",
      "lock"
    ],
    "properties": {
      "supported_code_lengths": [
        4,
        5,
        6,
        7,
        8
      ],
      "max_active_codes_supported": 250,
      "code_constraints": [
        {
          "constraint_type": "no_zeros"
        },
        {
          "constraint_type": "name_length",
          "min_length": 1,
          "max_length": 12
        }
      ],
      "supports_backup_access_code_pool": true
      ...
    },
    ...
  },
  ...
}
```

{% tabs %}
{% tab title="Javascript" %}
```javascript
const deviceId = "55072d5d-9a4f-4cba-8de2-1782df307899"

// get the device
const device = await seam.devices.get({
    device_id: deviceId,
})

// print out its properties and notice 
// the supported_code_lengths and code_constraints properties
console.log(device.properties)

/*
{
  locked: false,
  online: true,
  manufacturer: 'nuki',
  battery_level: 0.86,
  nuki_metadata: {
    device_id: '545636389',
    device_name: 'Office Lock',
    keypad_battery_critical: false
  },
  keypad_battery: { level: 1 },
  supported_code_lengths: [ 6 ],
  has_native_entry_events: true,
  name: 'Office Lock',
  model: { display_name: 'Lock', manufacturer_display_name: 'Nuki' },
  battery: { level: 0.86, status: 'full' },
  image_url: 'https://connect.getseam.com/assets/images/devices/nuki_smart_lock_3_pro_black.png',
  image_alt_text: 'Nuki Smart Lock 3.0 Pro Black, Front',
  code_constraints: [
    { constraint_type: 'cannot_start_with_12' },
    { constraint_type: 'no_zeros' },
    { constraint_type: 'name_length', max_length: 20 }
  ],
  supports_backup_access_code_pool: true
}
*/
```
{% endtab %}

{% tab title="Python" %}
```python
device_id = "0e2e6262-7f91-4970-a58d-47ef30b41e2e"

device = seam.devices.get(device_id)
print(device)

# Device(device_id='0e2e6262-7f91-4970-a58d-47ef30b41e2e',
#        device_type='nuki_lock',
#        location=None,
#        properties={'battery': {'level': 0.86, 'status': 'full'},
#                    'battery_level': 0.86,
#                    'code_constraints': [{'constraint_type': 'cannot_start_with_12'},
#                                         {'constraint_type': 'no_zeros'},
#                                         {'constraint_type': 'name_length',
#                                          'max_length': 20}],
#                    'has_native_entry_events': True,
#                    'image_alt_text': 'Nuki Smart Lock 3.0 Pro Black, Front',
#                    'image_url': 'https://connect.getseam.com/assets/images/devices/nuki_smart_lock_3_pro_black.png',
#                    'keypad_battery': {'level': 1},
#                    'locked': False,
#                    'manufacturer': 'nuki',
#                    'model': {'display_name': 'Lock',
#                              'manufacturer_display_name': 'Nuki'},
#                    'name': 'Office Lock',
#                    'nuki_metadata': {'device_id': '545636389',
#                                      'device_name': 'Office Lock',
#                                      'keypad_battery_critical': False},
#                    'online': True,
#                    'supported_code_lengths': [6],
#                    'supports_backup_access_code_pool': True},
#        capabilities_supported=['access_code', 'lock'],
#        errors=[],
#        warnings=[],
#        connected_account_id='5fe50f46-274f-4a03-ba95-3a517464fdc7',
#        workspace_id='1d2826eb-4a26-4f46-bddb-ef5898baa859',
#        created_at='2023-08-30T06:45:59.213Z')
```
{% endtab %}

{% tab title="Ruby" %}
```ruby
device_id = "0e2e6262-7f91-4970-a58d-47ef30b41e2e"
device = seam.devices.get(device_id)

puts device.inspect

# <Seam::Device:0x00438
#   device_id="0e2e6262-7f91-4970-a58d-47ef30b41e2e"
#   device_type="nuki_lock"
#   properties={"locked"=>false, "online"=>true, "manufacturer"=>"nuki", "battery_level"=>0.86, "nuki_metadata"=>{"device_id"=>"545636389", "device_name"=>"Office Lock", "keypad_battery_critical"=>false}, "keypad_battery"=>{"level"=>1}, "supported_code_lengths"=>[6], "has_native_entry_events"=>true, "name"=>"Office Lock", "model"=>{"display_name"=>"Lock", "manufacturer_display_name"=>"Nuki"}, "battery"=>{"level"=>0.86, "status"=>"full"}, "image_url"=>"https://connect.getseam.com/assets/images/devices/nuki_smart_lock_3_pro_black.png", "image_alt_text"=>"Nuki Smart Lock 3.0 Pro Black, Front", "code_constraints"=>[{"constraint_type"=>"cannot_start_with_12"}, {"constraint_type"=>"no_zeros"}, {"constraint_type"=>"name_length", "max_length"=>20}], "supports_backup_access_code_pool"=>true}
#   connected_account_id="5fe50f46-274f-4a03-ba95-3a517464fdc7"
#   workspace_id="1d2826eb-4a26-4f46-bddb-ef5898baa859"
#   created_at=2023-08-30 06:45:59.213 UTC
#   errors=[]
#   warnings=[]>
```
{% endtab %}

{% tab title="PHP" %}
```php
use Seam\SeamClient;

$seam = new SeamClient("YOUR_API_KEY");

$device = $seam->devices->get("0e2e6262-7f91-4970-a58d-47ef30b41e2e");

# Inspect this device to see which capabilities it supports
echo json_encode($device->properties, JSON_PRETTY_PRINT);

// {
//     "online": true,
//     "locked": false,
//     "name": "Office Lock",
//     "battery_level": 0.86,
//     "battery": {
//         "level": 0.86,
//         "status": "full"
//     },
//     "manufacturer": "nuki",
//     "supported_code_lengths": [
//         6
//     ],
//     "code_constraints": [
//         {
//             "constraint_type": "cannot_start_with_12"
//         },
//         {
//             "constraint_type": "no_zeros"
//         },
//         {
//             "constraint_type": "name_length",
//             "max_length": 20
//         }
//     ],
//     "model": {
//         "display_name": "Lock",
//         "manufacturer_display_name": "Nuki"
//     },
//     "image_url": "https:\/\/connect.getseam.com\/assets\/images\/devices\/nuki_smart_lock_3_pro_black.png",
//     "image_alt_text": "Nuki Smart Lock 3.0 Pro Black, Front",
//     "nuki_metadata": {
//         "device_id": "545636389",
//         "device_name": "Office Lock",
//         "keypad_battery_critical": false
//     }
// }
```
{% endtab %}

{% tab title="Curl" %}
**Request:**

<pre class="language-bash"><code class="lang-bash"><strong>$ curl --request POST 'https://connect.getseam.com/devices/get' \
</strong>--header 'Authorization: Bearer ${API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "device_id": "00000000-0000-0000-0000-000000000000"
 }'
</code></pre>

**Response:**

```json
{
  "device": {
    "device_id": "00000000-0000-0000-0000-000000000000",
    "capabilities_supported": [
      "access_code",
      "lock"
    ],
    "properties": {
      "supported_code_lengths": [
        4,
        5,
        6,
        7,
        8
      ],
      "max_active_codes_supported": 250,
      "code_constraints": [
        {
          "constraint_type": "no_zeros"
        },
        {
          "constraint_type": "name_length",
          "min_length": 1,
          "max_length": 12
        }
      ],
      "supports_backup_access_code_pool": true
      ...
    },
    ...
  },
  ...
}
```
{% endtab %}
{% endtabs %}

***

## Supported Code Lengths

This property is denoted as `supported_code_lengths` and contains an array of numbers. These numbers represent the various lengths (in terms of digits) allowed for a PIN code. For example, if the array contains `[4, 6]`, it means the door lock can accept 4-digit or 6-digit PIN codes.

**Example Payload:**

```json
"supported_code_lengths": [
    4,
    5,
    6,
    7,
    8
]
```

***

## Maximum Set Codes

The property `max_active_codes_supported` indicates the total number of codes that can be simultaneously set on a door lock. For the door locks that accommodate [native scheduling](./#native-scheduling), this count will includes future scheduled codes that are set on the lock.

**Example Payload:**

```json
"max_active_codes_supported": 250
```

***

## PIN Code Constraints

The `code_constraints` property gives insight into various conditions or limitations that apply to PIN codes. Each constraint in the `code_constraints` array is an object with at least the `constraint_type` property.

**Example Payload:**

```json
"code_constraints": [
    {
        "constraint_type": "no_zeros"
    },
    {
        "constraint_type": "name_length",
        "min_length": 1,
        "max_length": 12
    }
]
```

The `constraint_type` property can be one of the following:

| Constraint Type                     | Description                                                                                                                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`no_zeros`**                      | `0`s cannot be used as digits in the pin code.                                                                                                                                                                                        |
| **`cannot_start_with_12`**          | The pin code cannot start with the sequence of digits `12`.                                                                                                                                                                           |
| **`no_triple_consecutive_ints`**    | No more than 3 digits in a row can be consecutive or the same in the pin code.                                                                                                                                                        |
| **`cannot_specify_pin_code`**       | A pin code cannot be specified - it has to be left empty and one will be generated by the lock provider.                                                                                                                              |
| **`pin_code_matches_existing_set`** | If a pin code is specified, it must match an existing set of pin codes used in the account (for example, pin code matches the code assigned to a user in the system).                                                                 |
| **`start_date_in_future`**          | For time-bound codes, the start date has to be in the future.                                                                                                                                                                         |
| **`name_length`**                   | The name of the code has some restrictions on length. When the `constraint_type` is `name_length`, the constraint object has one or two additional properties called `min_length` and `max_length` to specify the length constraints. |
