---
description: >-
  Learn how to delete your access codes, and ensure that the code is
  successfully removed from the device.
---

# Deleting access codes

## 1. Delete the access code using the API

To delete an access code, use its `access_code_id` in the [Delete Access Code](../../../api-clients/access-codes/delete-an-access-code.md) request.

{% tabs %}
{% tab title="Javascript" %}
```javascript
const accessCodeId = 'aa5a89e6-fe68-4082-ae16-d192b0759670'
await seam.accessCodes.delete({access_code_id: accessCodeId})

// confirm that you get a 404
try {
    await seam.accessCodes.get({access_code_id: accessCodeId})
} catch(error) {
    console.log(error)
}


/*
{
  status: 404,
  requestId: '6c4a403c-29a5-474e-9140-131bd58c3a07',
  metadata: {
    type: 'access_code_not_found',
    message: 'Could not find an access_code with device_id or access_code_id',
    data: { access_code_id: 'aa5a89e6-fe68-4082-ae16-d192b0759670' },
    request_id: '6c4a403c-29a5-474e-9140-131bd58c3a07'
  }
}
*/

```
{% endtab %}

{% tab title="Python" %}
```python
access_code_id="fb61e71c-d165-40a4-a65f-1a9ee44f8774"

# delete the access code
seam.access_codes.delete(access_code_id)

# confirm you're getting a 404
try:
    seam.access_codes.get(access_code_id)
except Exception as e:
    print(e)
# SeamAPIException("SeamAPIException: status=404, request_id=f4723c0d-f03c-48dd-967d-4e3cdab517e7, metadata={'type': 'access_code_not_found', 'message': 'Could not find an access_code with device_id or access_code_id', 'data': {'access_code_id': 'fb61e71c-d165-40a4-a65f-1a9ee44f8774'}, 'request_id': 'f4723c0d-f03c-48dd-967d-4e3cdab517e7'}")

```
{% endtab %}

{% tab title="Ruby" %}
```ruby
require "seamapi"

seam = Seam::Client.new()
access_code_id = "043a9ac6-105e-4d15-b4b7-072f9b54b448"

# delete the code
seam.access_codes.delete(access_code_id)

# confirm you're getting an access code not found error
begin
    seam.access_codes.get(access_code_id)
rescue => e
    puts e
end

# => Api Error access_code_not_found
# request_id: b343e2e0-49c0-4cd9-bf47-030f1fa14966
# Could not find an access_code with device_id or access_code_id
```
{% endtab %}

{% tab title="PHP" %}
```php
use Seam\SeamClient;

$seam = new SeamClient("seam_test2ek7_2sq2ExLasPDwa9foJ8PyQ2zH");

$access_code_id = "e3d6cf81-6dd4-490c-b81f-8478054c2003";
$seam->access_codes->delete($access_code_id);

// confirm you're getting a 404
try {
    $deleted_access_code = $seam->access_codes->get(
        access_code_id: $access_code_id
    );
    echo json_encode($deleted_access_code, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo $e->getMessage();
}
// Error Calling "GET access_codes/get" : access_code_not_found: Could not find an access_code with device_id or access_code_id
```
{% endtab %}

{% tab title="Curl" %}
**Request:**

<pre class="language-bash"><code class="lang-bash"><strong>$ curl --request DELETE 'https://connect.getseam.com/access_codes/delete' \
</strong>--header 'Authorization: Bearer ${API_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "access_code_id": "00000000-0000-0000-0000-000000000000",
 }'
</code></pre>

**Response:**

```
{
    "action_attempt": {
        "status": "pending",
        "action_type": "DELETE_ACCESS_CODE",
        "action_attempt_id": "1e4c2ca2-bb42-4780-a1a4-6827d33a5d40",
        "result": null,
        "error": null
    },
    "ok": true
}
```
{% endtab %}
{% endtabs %}

***

## 2. Verify that the access code has been removed

There are two methods to verify that an access code has been removed:

**Polling method**

Utilize the `action_attempt_id` provided in the response from the [deletion endpoint](../../../api-clients/access-codes/delete-an-access-code.md) to call the [Get Action Attempt](../../../api-clients/action-attempt/get-action-attempt.md) endpoint. Typically, you'd poll this endpoint until the `status` reads `success`.

If the action attempt's status lingers as `pending`, or if the access code object reveals any `warnings` or `errors` properties, see [our "Troubleshooting Access Code Issues" guide](troubleshooting-access-code-issues.md) for help.

**Webhook method**

Here, you'll need to keep an eye on incoming webhook events. Specifically, watch for the `access_code.deleted` and `access_code.removed_from_device` events. These signify successful access code deletion and its removal from the device, respectively. It's worth noting that if you delete an access code that was never programmed onto a device, the `access_code.removed_from_device` event won't be triggered.

If, however, you encounter `access_code.failed_to_remove_from_device` or `access_code.delay_in_removing_from_device` events, it's imperative to consult [the "Troubleshooting access code issues" guide](troubleshooting-access-code-issues.md).
