---
description: >-
  Learn how to update your access codes, and ensure that the changes are
  successfully set on the device.
---

# Modifying access codes

## 1. Update the access code using the API

Any active or upcoming access codes may be updated using the [Update Access Code](../../../api-clients/access-codes/update-an-access-code.md) request.

When making this change, adjust the access code's properties such as the `code`, `name`, `starts_at`, and `ends_at` to the new desired values.

{% tabs %}
{% tab title="Javascript" %}
```javascript
const accessCodeId = "ddf217cb-3fee-48be-ad4d-e8af16ea6bb0"

const updatedAccessCode = await seam.accessCodes.update({
    name: "my updated code name",
    starts_at: new Date("2025-02-01T16:00:00Z").toISOString(),
    ends_at: new Date("2025-02-22T12:00:00Z").toISOString(),
    access_code_id: accessCodeId,
})

/*
{
  access_code_id: 'ddf217cb-3fee-48be-ad4d-e8af16ea6bb0',
  device_id: '77208078-6dd7-44e5-a3e4-a2ed3a34efc9',
  name: 'my updated code name',
  appearance: {
    name: 'seam-my updated code name seam_aa5a89e6-fe68-4082-ae16-d192b0759670',
    last_name: 'seam_aa5a89e6-fe68-4082-ae16-d192b0759670',
    first_name: 'seam-my updated code name'
  },
  code: '4456',
  common_code_key: null,
  type: 'time_bound',
  status: 'removing',
  starts_at: '2025-02-01T16:00:00.000Z',
  ends_at: '2025-02-22T12:00:00.000Z',
  is_backup_access_code_available: false,
  created_at: '2023-08-29T05:01:07.435Z',
  errors: [],
  warnings: [],
  is_managed: true
}
*/



```
{% endtab %}

{% tab title="Python" %}
```python
access_code_id = "0cf60b3a-2364-4d21-924e-64c7cb20bb62"

updated_access_code = seam.access_codes.update(
  access_code=access_code_id,
  name="my updated code name",
  starts_at="2025-02-01T16:00:00Z",
  ends_at="2025-02-22T12:00:00Z"
)

# AccessCode(access_code_id='0cf60b3a-2364-4d21-924e-64c7cb20bb62',
#            type='time_bound',
#            code='9846',
#            starts_at='2025-02-01T16:00:00.000Z',
#            ends_at='2025-02-22T12:00:00.000Z',
#            name='my updated code name',
#            status='unset',
#            common_code_key=None)
```
{% endtab %}

{% tab title="Ruby" %}
```ruby
access_code_id = "043a9ac6-105e-4d15-b4b7-072f9b54b448"
seam.access_codes.update(
    access_code_id: access_code_id,
    name: 'my updated code name',
    starts_at: '2025-02-01T16:00:00Z',
    ends_at: '2025-02-22T12:00:00Z'
)

access_code = seam.access_codes.get(access_code_id)
print(access_code.inspect)
# <Seam::AccessCode:0x004b0
#   access_code_id="043a9ac6-105e-4d15-b4b7-072f9b54b448"
#   name="my updated code name"
#   code="2262"
#   type="time_bound"
#   starts_at=2025-02-01 16:00:00 UTC
#   ends_at=2025-02-22 12:00:00 UTC
#   errors=[]
#   warnings=[]>%

```
{% endtab %}

{% tab title="PHP" %}
```php
use Seam\SeamClient;

$seam = new SeamClient("YOUR_API_KEY");

$access_code_id = "e3d6cf81-6dd4-490c-b81f-8478054c2003";

$updated_code = $seam->access_codes->update(
  access_code_id: $access_code_id,
  name: 'my updated code name',
  starts_at:  "2025-02-01T16:00:00Z",
  ends_at: "2025-02-22T12:00:00Z"
);

# Inspect this updated code
echo json_encode($updated_code, JSON_PRETTY_PRINT);

// {
//     "access_code_id": "e3d6cf81-6dd4-490c-b81f-8478054c2003",
//     "device_id": "0e2e6262-7f91-4970-a58d-47ef30b41e2e",
//     "name": "my updated code name",
//     "type": "time_bound",
//     "status": "unset",
//     "starts_at": "2025-02-01T16:00:00.000Z",
//     "ends_at": "2025-02-22T12:00:00.000Z",
//     "code": "834435",
//     "created_at": "2023-09-04T05:32:32.085Z",
//     "errors": [],
//     "warnings": [],
//     "is_managed": true,
//     "common_code_key": null,
//     "is_waiting_for_code_assignment": null
// }
```
{% endtab %}

{% tab title="Curl" %}
**Request:**

<pre class="language-bash"><code class="lang-bash"><strong>$ curl --request PUT 'https://connect.getseam.com/access_codes/update' \
</strong>--header 'Authorization: Bearer ${API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "access_code_id": "00000000-0000-0000-0000-000000000000",
  "name": "New Name",
  "code": "1111"
 }'
</code></pre>

**Response:**

```
{
  "action_attempt": {
    "status": "pending",
    "action_type": "UPDATE_ACCESS_CODE",
    "action_attempt_id": "UUID-1",
    "result": null,
    "error": null
  },
  "access_code": {
    "access_code_id": "00000000-0000-0000-0000-000000000000",
    "device_id": "11111111-1111-1111-1111-111111111111",
    "name": "New Name",
    "code": "1111",
    "common_code_key": null,
    "type": "ongoing",
    "status": "setting",
    "created_at": "2023-01-01T00:00:00Z",
    "errors": [],
    "warnings": [],
    "is_managed": true
  },
  "ok": true
}
```
{% endtab %}
{% endtabs %}

***

## 2. Verify that the access code has been updated

### For a permanent access code

There are two methods to verify that a permanent access code has been set on the device:

**Polling Method**

Utilize the `access_code_id` returned in the response from the create endpoint to invoke the [Get Access Code](../../../api-clients/access-codes/get-an-access-code.md) endpoint. A basic implementation would involve polling this endpoint until the `status` of the access code updates to `set`.

If the `status` remains `setting` for a very long time, or if the `access_code` object contains any `warnings` or `errors` properties, consult [our guide on "Troubleshooting Access Code Issues"](troubleshooting-access-code-issues.md) for further guidance.

**Webhook Events Method**

Monitor the incoming events on your webhook. Be on the lookout for the `access_code.set_on_device` event, which indicates the successful setting of the access code on the device.

However, if you receive `access_code.failed_to_set_on_device` or `access_code.delay_in_setting_on_device` events, it's crucial to refer to [the "Troubleshooting access code issues" guide](troubleshooting-access-code-issues.md) for assistance.

### For a time-bound access code

There are two methods to verify that a time-bound access code has been set on the device:

**Polling Method**

Use the `access_code_id` provided in the response from the create endpoint to call the [Get Access Code](../../../api-clients/access-codes/get-an-access-code.md) endpoint. In a basic implementation, you would poll this endpoint at the `starts_at` time to check if the access code's status is updated to `set`.

If the `status` remains `setting`, or if the `access_code` object displays any warnings or errors, refer to [our "Troubleshooting Access Code Issues" guide](troubleshooting-access-code-issues.md) for assistance.

**Webhook Events Method**

Monitor the incoming events on your webhook. Be on the lookout for the `access_code.set_on_device` event, which indicates the successful setting of the access code on the device.

However, if you receive `access_code.failed_to_set_on_device` or `access_code.delay_in_setting_on_device` events, it's crucial to refer to [the "Troubleshooting access code issues" guide](troubleshooting-access-code-issues.md) for assistance.

***

## Special Case #1: Changing an ongoing access code to time-bound access

When converting a permanent access code to time-bound access, you'll also need to set the `starts_at` and `ends_at` properties to the time frame you want.

{% tabs %}
{% tab title="Javascript" %}
```javascript
const accessCodeId = 'aa5a89e6-fe68-4082-ae16-d192b0759670'

// get the ongoing code
let accessCode = await seam.accessCodes.get({access_code_id: accessCodeId})
console.log(accessCode.typy)

// => ongoing


// update the code to give it a starts_at/ends_at
await seam.accessCodes.update({
  starts_at: new Date("2025-01-01T16:00:00Z").toISOString(),
  ends_at: new Date("2025-01-22T12:00:00Z").toISOString(),
  access_code_id: "ed4a1f62-9070-4379-8c46-ea30a99e4d74",
  sync: true, // a flag you can pass to wait until the update has taken place
})

// retrieve the updated access code and confirm the starts_at/ends_at are there
accessCode = await seam.accessCodes.get({access_code_id: accessCodeId})
console.log(accessCode)

/*
{
  access_code_id: 'aa5a89e6-fe68-4082-ae16-d192b0759670',
  device_id: '77208078-6dd7-44e5-a3e4-a2ed3a34efc9',
  name: 'my updated code name',
  appearance: {
    name: 'seam-my updated code name seam_aa5a89e6-fe68-4082-ae16-d192b0759670',
    last_name: 'seam_aa5a89e6-fe68-4082-ae16-d192b0759670',
    first_name: 'seam-my updated code name'
  },
  code: '4456',
  common_code_key: null,
  type: 'time_bound',
  status: 'removing',
  starts_at: '2025-01-01T16:00:00.000Z',
  ends_at: '2025-01-22T12:00:00.000Z',
  is_backup_access_code_available: false,
  created_at: '2023-08-29T05:01:07.435Z',
  errors: [],
  warnings: [],
  is_managed: true
}
*/
```
{% endtab %}

{% tab title="Python" %}
```python
access_code_id="fb61e71c-d165-40a4-a65f-1a9ee44f8774"

# confirm that the code starts as an ongoing code
access_code = seam.access_codes.get(access_code_id)
print(access_code.type)
# ongoing

# update the code to set starts_at and ends_at timestamps
seam.access_codes.update(
  access_code=access_code_id,
  starts_at="2025-01-01T16:00:00Z",
  ends_at="2025-01-22T12:00:00Z"
)

# Confirm that the type has changed to time-bound
access_code = seam.access_codes.get(access_code_id)
print(access_code.type)
# time_bound
```
{% endtab %}

{% tab title="Ruby" %}
```ruby
access_code_id = "0e2e1d48-c694-4430-8a4f-2dc98b6ec570"

# confirm that the code is currently an ongoing code
access_code = seam.access_codes.get(access_code_id)
puts access_code.type # => ongoing

# update it to a timebound code
seam.access_codes.update(
    access_code_id: access_code_id,
    name: 'my updated code name',
    starts_at: '2025-02-01T16:00:00Z',
    ends_at: '2025-02-22T12:00:00Z'
)

# confirm the update
access_code = seam.access_codes.get(access_code_id)
print(access_code.inspect)


# <Seam::AccessCode:0x004b0
#   access_code_id="0e2e1d48-c694-4430-8a4f-2dc98b6ec570"
#   name="my updated code name"
#   code="1275"
#   type="time_bound"
#   starts_at=2025-02-01 16:00:00 UTC
#   ends_at=2025-02-22 12:00:00 UTC
#   errors=[]
#   warnings=[]>
```
{% endtab %}

{% tab title="PHP" %}
```php
use Seam\SeamClient;

$seam = new SeamClient("YOUR_API_KEY");

$access_code_id = "bd7e8681-4df6-437c-a12a-e965ecca9caf";
$ongoing_code = $seam->access_codes->get($access_code_id);
echo json_encode($ongoing_code->type);
// "ongoing"

$updated_code = $seam->access_codes->update(
  access_code_id: $access_code_id,
  name: 'my ongoing code converted to timebound code',
  starts_at:  "2025-01-01T16:00:00Z",
  ends_at: "2025-01-22T12:00:00Z"
);

# Inspect this updated code
echo json_encode($updated_code, JSON_PRETTY_PRINT);
// {
//     "access_code_id": "bd7e8681-4df6-437c-a12a-e965ecca9caf",
//     "device_id": "0e2e6262-7f91-4970-a58d-47ef30b41e2e",
//     "name": "my ongoing code converted to timebound code",
//     "type": "time_bound",
//     "status": "removing",
//     "starts_at": "2025-01-01T16:00:00.000Z",
//     "ends_at": "2025-01-22T12:00:00.000Z",
//     "code": "453419",
//     "created_at": "2023-09-04T05:29:08.084Z",
//     "errors": [],
//     "warnings": [],
//     "is_managed": true,
//     "common_code_key": null,
//     "is_waiting_for_code_assignment": null
// }
```
{% endtab %}

{% tab title="Curl" %}
<pre class="language-bash"><code class="lang-bash"><strong>$ curl --request PUT 'https://connect.getseam.com/access_codes/update' \
</strong>--header 'Authorization: Bearer ${API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "access_code_id": "00000000-0000-0000-0000-000000000000",
  "starts_at": "2023-01-02T00:00:00Z",
  "ends_at": "2023-01-03T00:00:00Z"
 }'
</code></pre>
{% endtab %}
{% endtabs %}

***

## Special Case #2: Changing a time-bound access code to permanent access

When converting a time-bound code to a permanent one, you'll also need to set the `type` property of the access code to `ongoing`.

{% tabs %}
{% tab title="Javascript" %}
```javascript
const accessCodeId = 'aa5a89e6-fe68-4082-ae16-d192b0759670'

// retrieve a timebound code
accessCode = await seam.accessCodes.get({access_code_id: accessCodeId})
console.log(accessCode)

/*
{
  access_code_id: 'aa5a89e6-fe68-4082-ae16-d192b0759670',
  device_id: '77208078-6dd7-44e5-a3e4-a2ed3a34efc9',
  name: 'my updated code name',
  appearance: {
    name: 'seam-my updated code name seam_aa5a89e6-fe68-4082-ae16-d192b0759670',
    last_name: 'seam_aa5a89e6-fe68-4082-ae16-d192b0759670',
    first_name: 'seam-my updated code name'
  },
  code: '4456',
  common_code_key: null,
  type: 'time_bound',
  status: 'removing',
  starts_at: '2025-01-01T16:00:00.000Z',
  ends_at: '2025-01-22T12:00:00.000Z',
  is_backup_access_code_available: false,
  created_at: '2023-08-29T05:01:07.435Z',
  errors: [],
  warnings: [],
  is_managed: true
}
*/

// update it to ongoing
await seam.accessCodes.update({
    type: "ongoing",
    access_code_id: accessCodeId,
    sync: true
})

// refresh the access code and confirm that starts_at and ends_at are gone
accessCode = await seam.accessCodes.get({access_code_id: accessCodeId})
console.log(accessCode)
/*
{
  access_code_id: 'aa5a89e6-fe68-4082-ae16-d192b0759670',
  device_id: '77208078-6dd7-44e5-a3e4-a2ed3a34efc9',
  name: 'my updated code name',
  appearance: {
    name: 'seam-my updated code name seam_aa5a89e6-fe68-4082-ae16-d192b0759670',
    last_name: 'seam_aa5a89e6-fe68-4082-ae16-d192b0759670',
    first_name: 'seam-my updated code name'
  },
  code: '4456',
  common_code_key: null,
  type: 'ongoing',
  status: 'set',
  is_backup_access_code_available: false,
  created_at: '2023-08-29T05:01:07.435Z',
  errors: [],
  warnings: [],
  is_managed: true
}
*/
```
{% endtab %}

{% tab title="Python" %}
```python
from seamapi import Seam

seam = Seam()

access_code_id = "81bb1568-f55e-4d91-98b7-dad1259ee7df"

# Update its type to ongoing
seam.access_codes.update(
  type="ongoing",
  access_code=access_code_id
)
```
{% endtab %}

{% tab title="Ruby" %}
```ruby
require "seamapi"

seam = Seam::Client.new()

access_code_id = "1ec3d38d-09bc-48f2-8e05-d0ce0900571f"

# confirm that the code is currently a timebound code
access_code = seam.access_codes.get(access_code_id)
puts access_code.type # => timebound

# update it to a timebound code
seam.access_codes.update(
    access_code_id: access_code_id,
    type: "ongoing"
)

# confirm the update
access_code = seam.access_codes.get(access_code_id)
print(access_code.inspect)

# <Seam::AccessCode:0x004b0
#   access_code_id="1ec3d38d-09bc-48f2-8e05-d0ce0900571f"
#   device_id="aa3958c3-4236-4f71-bd77-3b60f85b3456"
#   name="my time-bound code"
#   code="9333"
#   type="ongoing"   <============ NEW TYPE
#   status="setting"
#   is_scheduled_on_device=false
#   is_backup_access_code_available=false
#   created_at=2023-09-07 05:56:05.357 UTC
#   errors=[]
#   warnings=[]
#   is_managed=true>
```
{% endtab %}

{% tab title="PHP" %}
```php
$access_code_id = "f7972a4c-83ca-40dc-8c25-f56f7668597e";
$ongoing_code = $seam->access_codes->get($access_code_id);
echo json_encode($ongoing_code->type);
// "time_bound"

$updated_code = $seam->access_codes->update(
  access_code_id: $access_code_id,
  type: "ongoing"
);

# Inspect this updated code
echo json_encode($updated_code, JSON_PRETTY_PRINT);

// {
//     "access_code_id": "f7972a4c-83ca-40dc-8c25-f56f7668597e",
//     "device_id": "5a9dee23-e50f-4da7-88f3-fef38bf07857",
//     "name": "my time-bound code",
//     "type": "ongoing",
//     "status": "setting",
//     "starts_at": null,
//     "ends_at": null,
//     "code": "1611",
//     "created_at": "2023-09-16T20:18:25.837Z",
//     "errors": [],
//     "warnings": [],
//     "is_managed": true,
//     "common_code_key": null,
//     "is_waiting_for_code_assignment": null,
//     "is_scheduled_on_device": false,
//     "pulled_backup_access_code_id": "8e5a9970-3804-4dfc-af61-fb81b0a4483d",
//     "is_backup_access_code_available": true,
//     "is_backup": null
// }
```
{% endtab %}

{% tab title="Curl" %}
<pre class="language-bash"><code class="lang-bash"><strong>$ curl --request PUT 'https://connect.getseam.com/access_codes/update' \
</strong>--header 'Authorization: Bearer ${API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "access_code_id": "00000000-0000-0000-0000-000000000000",
  "type": "ongoing"
 }'
</code></pre>
{% endtab %}
{% endtabs %}
