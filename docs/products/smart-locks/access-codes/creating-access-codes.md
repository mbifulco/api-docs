---
description: >-
  Learn how to program an access code onto a smart lock with a keypad, and
  ensure the code is successfully set.
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Creating Access Codes

## Overview

This guide explains how to create access codes on a smart lock. With the [Access Codes](../../../api-clients/access-codes/) API, generate PIN codes on a door lock and share it with visitors, allowing them keyless access.

Seam supports programming two types of access codes:

1. **Ongoing**: Ideal for residents or long-term users. Ongoing codes remain active on a device until removed. Create one by leaving the `end_at` field empty. To remove the code, use the [Delete Access Code](../../../api-clients/access-codes/delete-an-access-code.md) endpoint.
2. **Time Bound**: Suitable for temporary access like guest visits or service appointments. These codes operate between a designated `starts_at` and `ends_at` time window, granting access only during that period.

***

## Before You Begin

To confirm that Seam supports access code programming for your device, use [Get Device](../../../api-clients/devices/get-device.md) to query the device and check its `capabilities_supported` property. Ensure that `capabilities_supported` list includes `access_code`. After you've done that, come back here and keep reading.

**Example Payload:**

```
{
    "device_id": "00000000-0000-0000-0000-000000000000",
    "capabilities_supported": [
        "access_code",
        ...
    ],
    ...
}
```



{% tabs %}
{% tab title="Javascript" %}
```javascript
const device = await seam.devices.get({
  device_id: "77208078-6dd7-44e5-a3e4-a2ed3a34efc9"
})
console.log(device.capabilities_supported)
// ['access_code', 'lock']
```
{% endtab %}

{% tab title="Python" %}
```python
from seamapi import Seam

seam = Seam()
device = seam.devices.get("aa3958c3-4236-4f71-bd77-3b60f85b3456")

# Inspect this device to see which capabilities it supports
print(device.capabilities_supported)
# ['access_code', 'lock']
```
{% endtab %}

{% tab title="Ruby" %}
```ruby
seam = Seam::Client.new()
device_id = "aa3958c3-4236-4f71-bd77-3b60f85b3456"
some_lock = seam.locks.get(device_id)

# confirm that the device supports the "access code" capability
puts some_lock.capabilities_supported
# [access_code, lock]
```
{% endtab %}

{% tab title="PHP" %}
```php
use Seam\SeamClient;

$seam = new SeamClient("seam_test2ek7_2sq2ExLasPDwa9foJ8PyQ2zH");

$device = $seam->devices->get("0e2e6262-7f91-4970-a58d-47ef30b41e2e");

# Inspect this device to see which capabilities it supports
echo json_encode($device->capabilities_supported, JSON_PRETTY_PRINT);

# [
#     "access_code",
#     "lock"
# ]
```
{% endtab %}
{% endtabs %}

***

## Programming an Ongoing Code

Ongoing Access codes are ideal for long-term users that wish to keep the same code. Ongoing codes remain active on a device until removed. They can start right away or at a later date if you provide a `starts_at`timestamp.

<figure><img src="../../../.gitbook/assets/ongoing-access-code-light.png" alt=""><figcaption><p>Timeline of an ongoing access code. The code will remain active until you ask Seam to remove it.</p></figcaption></figure>

### 1. Create an Ongoing Access Code

Set an ongoing code by providing the `device_id` of the smart lock on which you want to [create an access code](../../../api-clients/access-codes/create-an-access-code.md). Assign an optional `name` to the access code for easier identification within the [Seam Console](https://console.seam.co) and smart lock app. Include an optional `starts_at` value to specify when this code should become active.

To customize the PIN code, specify a desired PIN for the `code` property. Refer to [the guide on access code requirements](access-code-requirements-for-door-locks.md) to understand any requirements specific to the door lock.

{% tabs %}
{% tab title="Javascript" %}
```javascript
const deviceId = "77208078-6dd7-44e5-a3e4-a2ed3a34efc9"

const createdAccessCode = await seam.accessCodes.create({
    device_id: deviceId,
    name: "my ongoing code"
})
  
console.log(createdAccessCode)

/*
{
  access_code_id: 'aa5a89e6-fe68-4082-ae16-d192b0759670',
  device_id: '77208078-6dd7-44e5-a3e4-a2ed3a34efc9',
  name: 'my ongoing code',
  appearance: null,
  code: '4456',
  common_code_key: null,
  type: 'ongoing',
  status: 'setting',
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
device_id = "aa3958c3-4236-4f71-bd77-3b60f85b3456"

created_access_code = seam.access_codes.create(
  device=device_id,
  name="my ongoing code"
)

print(created_access_code)

# AccessCode(access_code_id='0cf60b3a-2364-4d21-924e-64c7cb20bb62',
#            type='ongoing',
#            code='9846',
#            starts_at=None,
#            ends_at=None,
#            name='my ongoing code',
#            status='setting',
#            common_code_key=None)
```
{% endtab %}

{% tab title="Ruby" %}
```ruby
device_id = "aa3958c3-4236-4f71-bd77-3b60f85b3456"

created_access_code = seam.access_codes.create(
  device_id: device_id,
  name: "my ongoing code",
)

puts created_access_code.inspect

# <Seam::AccessCode:0x00438
#   code="1275"
#   name="my ongoing code"
#   type="ongoing"
#   errors=[]
#   warnings=[]
#   access_code_id="0e2e1d48-c694-4430-8a4f-2dc98b6ec570">
```
{% endtab %}

{% tab title="PHP" %}
```php
$seam = new SeamClient("YOUR_API_KEY");

$device_id = "0e2e6262-7f91-4970-a58d-47ef30b41e2e";

$access_code = $seam->access_codes->create(
  device_id: $device_id,
  name: 'my ongoing code',
);

# Inspect this created code
echo json_encode($access_code, JSON_PRETTY_PRINT);

// {
//     "access_code_id": "bd7e8681-4df6-437c-a12a-e965ecca9caf",
//     "device_id": "0e2e6262-7f91-4970-a58d-47ef30b41e2e",
//     "name": "my ongoing code",
//     "type": "ongoing",
//     "status": "setting",
//     "starts_at": null,
//     "ends_at": null,
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
### Request:

```sh
$ curl --request POST 'https://connect.getseam.com/access_codes/create' \
--header 'Authorization: Bearer ${API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "device_id": "00000000-0000-0000-0000-000000000000",
  "name": "Ongoing Access Code",
  "code": "1234"
 }'
```

### Response:

```sh
{
  "action_attempt": {
    "status": "pending",
    "action_type": "CREATE_ACCESS_CODE",
    "action_attempt_id": "11111111-1111-1111-1111-111111111111",
    "result": null,
    "error": null
  },
  "access_code": {
    "access_code_id": "22222222-2222-2222-2222-222222222222",
    "device_id": "00000000-0000-0000-0000-000000000000",
    "name": "Ongoing Access Code",
    "code": "1234",
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

### 2. Verify Successful Ongoing Code Programming

Seam may encounter some problems when setting an access code onto the lock. This could be due to weak internet connectivity, a low battery in the door lock, or someone unplugging the bridge that links the lock to the internet. **Given these potential challenges, it's essential to verify that a code has been successfully programmed on to the lock** to prevent unexpected complications later.

There are two methods to verify that an ongoing access code has been set on the device:

* **Polling**: continuously query the access code until its `status` is updated
* **Webhook**: wait for updates to arrive via webhook requests from the Seam API

### **Polling Method**

Use the `access_code` reference returned by the create function to call the [Get Access Code](../../../api-clients/access-codes/get-an-access-code.md) function. A basic implementation would involve polling this endpoint until the `status` of the access code updates to `set`.

If the `status` remains `setting` for a very long time, or if the `access_code` object contains any `warnings` or `errors` properties, consult [the guide on "Troubleshooting Access Code Issues"](troubleshooting-access-code-issues.md) for further guidance.

<figure><img src="../../../.gitbook/assets/ongoing-access-code-polling-verification-dark.png" alt=""><figcaption><p>Illustration of the polling verification step for an ongoing access code</p></figcaption></figure>

### **Webhook Events Method**

To avoid polling, monitor for incoming Seam webhook events related to the code status:

* The `access_code.set_on_device` event indicates the successful setting of the access code on the device.
* The `access_code.failed_to_set_on_device` or `access_code.delay_in_setting_on_device` events indicate a delay or failure.

In the event of delay or failure, refer to [the "Troubleshooting access code issues" guide](troubleshooting-access-code-issues.md) for assistance and mitigation strategies.

<figure><img src="../../../.gitbook/assets/ongoing-access-code-webhook-verification-dark.png" alt=""><figcaption><p>Illustration of the webhook verification method for an ongoing access code</p></figcaption></figure>

***

## Scheduling Time-Bound Access Codes

Time-bound access codes are **s**uitable for temporary access like guest visits or service appointments. These codes operate between designated `starts_at` and `ends_at` timestamps, granting access only during that period. Seam automatically ensures that code is programmed on the device at the `starts_at` time, and unprogrammed at the `ends_at` time.

<figure><img src="../../../.gitbook/assets/time-bound-access-code-light.png" alt=""><figcaption><p>Timeline of an time-bound access code. The code will remain active until the ends_at timestamp you provide Seam.</p></figcaption></figure>

### 1. Create a Time-Bound Access Code

To set a time-bound code, provide the `device_id` of the smart lock you wish to program a code on, along with `starts_at` and `ends_at` iso8601 timestamps to define the code's active time window. For more details, refer to the [Create Access Code endpoint](../../../api-clients/access-codes/create-an-access-code.md).

As with ongoing codes, an optional `name` can be assigned to the access code. A clear name helps users identify the access code quickly within their smart lock app.

Similarly, to customize the PIN code, specify a desired PIN in the `code` property. Refer to [our guide on access code requirements](access-code-requirements-for-door-locks.md) to understand any requirements specific to the door lock brand.

{% tabs %}
{% tab title="Javascript" %}
```javascript
const deviceId = "77208078-6dd7-44e5-a3e4-a2ed3a34efc9"

const accessCode = await seam.accessCodes.create({
    device_id: deviceId,
    name: "my time-bound code",
    starts_at: new Date("2025-01-01T16:00:00Z").toISOString(),
    ends_at: new Date("2025-01-22T12:00:00Z").toISOString()
  })
  
console.log(accessCode)

/*
{
  access_code_id: 'ddf217cb-3fee-48be-ad4d-e8af16ea6bb0',
  device_id: '77208078-6dd7-44e5-a3e4-a2ed3a34efc9',
  name: 'my time-bound code',
  appearance: null,
  code: '3857',
  common_code_key: null,
  type: 'time_bound',
  status: 'unset',
  is_scheduled_on_device: false,
  starts_at: '2025-01-01T16:00:00.000Z',
  ends_at: '2025-01-22T12:00:00.000Z',
  is_backup_access_code_available: false,
  created_at: '2023-08-29T05:02:21.812Z',
  errors: [],
  warnings: [],
  is_managed: true
}
*/

```
{% endtab %}

{% tab title="Python" %}
```python
device_id = "aa3958c3-4236-4f71-bd77-3b60f85b3456"

created_access_code = seam.access_codes.create(
  device=device_id,
  name="my time-bound code",
  starts_at="2025-01-01T16:00:00Z",
  ends_at="2025-01-22T12:00:00Z"
)
print(created_access_code)

# AccessCode(access_code_id='fb61e71c-d165-40a4-a65f-1a9ee44f8774',
#            type='time_bound',
#            code='4747',
#            starts_at='2025-01-01T16:00:00.000Z',
#            ends_at='2025-01-22T12:00:00.000Z',
#            name='my time-bound code',
#            status='unset',
#            common_code_key=None)
```
{% endtab %}

{% tab title="Ruby" %}
```ruby
device_id = "aa3958c3-4236-4f71-bd77-3b60f85b3456"

created_access_code = seam.access_codes.create(
  device_id: device_id,
  name: "my time-bound code",
  starts_at: "2025-01-01T16:00:00Z",
  ends_at: "2025-01-22T12:00:00Z"
)

puts created_access_code.inspect

# <Seam::AccessCode:0x00438
#   code="2262"
#   name="my time-bound code"
#   type="time_bound"
#   errors=[]
#   ends_at=2025-01-22 12:00:00 UTC
#   warnings=[]
#   starts_at=2025-01-01 16:00:00 UTC
#   access_code_id="043a9ac6-105e-4d15-b4b7-072f9b54b448">

```
{% endtab %}

{% tab title="PHP" %}
```php
$seam = new SeamClient("seam_test2ek7_2sq2ExLasPDwa9foJ8PyQ2zH");

$device_id = "0e2e6262-7f91-4970-a58d-47ef30b41e2e";

$access_code = $seam->access_codes->create(
  device_id: $device_id,
  name: 'my timebound code',
  starts_at:  "2025-01-01T16:00:00Z",
  ends_at: "2025-01-22T12:00:00Z"
);

# Inspect this timebound code
echo json_encode($access_code, JSON_PRETTY_PRINT);

// {
//   "access_code_id": "e3d6cf81-6dd4-490c-b81f-8478054c2003",
//   "device_id": "0e2e6262-7f91-4970-a58d-47ef30b41e2e",
//   "name": "my timebound code",
//   "type": "time_bound",
//   "status": "unset",
//   "starts_at": "2025-01-01T16:00:00.000Z",
//   "ends_at": "2025-01-22T12:00:00.000Z",
//   "code": "834435",
//   "created_at": "2023-09-04T05:32:32.085Z",
//   "errors": [],
//   "warnings": [],
//   "is_managed": true,
//   "common_code_key": null,
//   "is_waiting_for_code_assignment": null
// }
```
{% endtab %}

{% tab title="Curl" %}
### Request:

```sh
$ curl --request POST 'https://connect.getseam.com/access_codes/create' \
--header 'Authorization: Bearer ${API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "device_id": "00000000-0000-0000-0000-000000000000",
  "name": "Temporary Access Code",
  "code": "1234",
  "starts_at": "2023-01-02T00:00:00Z",
  "ends_at": "2023-01-05T00:00:00Z"
 }'
```

### Response:

```sh
{
  "action_attempt": {
    "status": "pending",
    "action_type": "CREATE_ACCESS_CODE",
    "action_attempt_id": "11111111-1111-1111-1111-111111111111",
    "result": null,
    "error": null
  },
  "access_code": {
    "access_code_id": "22222222-2222-2222-2222-222222222222",
    "device_id": "00000000-0000-0000-0000-000000000000",
    "name": "Temporary Access Code",
    "code": "1234",
    "type": "timebound",
    "status": "unset",
    "starts_at": "2023-01-02T00:00:00Z",
    "ends_at": "2023-01-05T00:00:00Z",
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

### 2. Verify Successful Time-Bound Code Programming

The [lifecycle of a time-bound access code](lifecycle-of-access-codes.md) is marked by distinct phases:

1. `Unset`: When initially created on Seam, the access code remains in an `unset` state, indicating it has not yet been programmed onto the door lock due to its future activation time.
2. `Setting`: As the scheduled `starts_at` time approaches, Seam initiates the process of programming the code onto the lock, transitioning the code's `status` to `setting`.
3. `Set`: Upon successful programming, the status updates to `set`, signaling that the code is loaded onto the lock, and may grant the designated user the ability to unlock the door.

<figure><img src="../../../.gitbook/assets/state-sequence-for-access-codes-lifecycle-dark.png" alt=""><figcaption><p>Life-cycle of a time-bound access code</p></figcaption></figure>

On door locks that support [natively scheduled](./#native-scheduling) access codes, Seam will preload the access code into the device's internal memory bank **72 hours ahead** of the `starts_at` time. Even if preloaded in memory, the access code will remain in an `unset` state ahead of the `starts_at` time and await the precise activation moment to toggle its status. When the `starts_at` time arrives, the access code becomes active and transition to a `set` status, granting the designated user the ability to utilize it for entry. If there's an issue programming the natively-scheduled code by its `starts_at` time, the code's status will display as `setting`. For more information on the lifecycle of access codes, [please refer to this guide](lifecycle-of-access-codes.md).

There are two methods to verify that an time-bound access code has been set on the device:

* **Polling**: continuously query the access code until its `status` is updated
* **Webhook**: wait for updates to arrive via webhook requests from the Seam API

### **Polling Method**

Use the `access_code` reference returned by the create function to call the [Get Access Code](../../../api-clients/access-codes/get-an-access-code.md) function. In a basic implementation, you would poll this endpoint at the `starts_at` time to check if the access code's status is updated to `set`.

If the `status` remains `setting`, or if the `access_code` object displays any `warnings` or `errors`, refer to [the "Troubleshooting Access Code Issues" guide](troubleshooting-access-code-issues.md) for assistance.

<figure><img src="../../../.gitbook/assets/timebound-access-code-polling-verification-dark.png" alt=""><figcaption></figcaption></figure>

### **Webhook Events Method**

To avoid polling, monitor for incoming Seam webhook events related to the code status:

* The `access_code.set_on_device` event indicates the successful setting of the access code on the device.
* The `access_code.failed_to_set_on_device` or `access_code.delay_in_setting_on_device` events indicate a delay or failure.

In the event of delay or failure, refer to [the "Troubleshooting access code issues" guide](troubleshooting-access-code-issues.md) for assistance and mitigation strategies.

<figure><img src="../../../.gitbook/assets/timebound-access-code-webhook-verification-dark.png" alt=""><figcaption></figcaption></figure>
