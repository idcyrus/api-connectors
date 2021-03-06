# OrderApi

All URIs are relative to *https://localhost/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**orderAmend**](OrderApi.md#orderAmend) | **PUT** /order | Amend the quantity or price of an open order.
[**orderAmendBulk**](OrderApi.md#orderAmendBulk) | **PUT** /order/bulk | Amend multiple orders.
[**orderCancel**](OrderApi.md#orderCancel) | **DELETE** /order | Cancel order(s). Send multiple order IDs to cancel in bulk.
[**orderCancelAll**](OrderApi.md#orderCancelAll) | **DELETE** /order/all | Cancels all of your orders.
[**orderCancelAllAfter**](OrderApi.md#orderCancelAllAfter) | **POST** /order/cancelAllAfter | Automatically cancel all your orders after a specified timeout.
[**orderClosePosition**](OrderApi.md#orderClosePosition) | **POST** /order/closePosition | Close a position. [Deprecated, use POST /order with execInst: &#39;Close&#39;]
[**orderGetOrders**](OrderApi.md#orderGetOrders) | **GET** /order | Get your orders.
[**orderNew**](OrderApi.md#orderNew) | **POST** /order | Create a new order.
[**orderNewBulk**](OrderApi.md#orderNewBulk) | **POST** /order/bulk | Create multiple new orders.


<a name="orderAmend"></a>
# **orderAmend**
> Order orderAmend(orderID, origClOrdID, clOrdID, simpleOrderQty, orderQty, simpleLeavesQty, leavesQty, price, stopPx, pegOffsetValue, text)

Amend the quantity or price of an open order.

Send an &#x60;orderID&#x60; or &#x60;origClOrdID&#x60; to identify the order you wish to amend.  Both order quantity and price can be amended. Only one &#x60;qty&#x60; field can be used to amend.  Use the &#x60;leavesQty&#x60; field to specify how much of the order you wish to remain open. This can be useful if you want to adjust your position&#39;s delta by a certain amount, regardless of how much of the order has already filled.  Use the &#x60;simpleOrderQty&#x60; and &#x60;simpleLeavesQty&#x60; fields to specify order size in Bitcoin, rather than contracts. These fields will round up to the nearest contract.  Like order placement, amending can be done in bulk. Simply send a request to &#x60;PUT /api/v1/order/bulk&#x60; with a JSON body of the shape: &#x60;{\&quot;orders\&quot;: [{...}, {...}]}&#x60;, each object containing the fields used in this endpoint. 

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OrderApi;


OrderApi apiInstance = new OrderApi();
String orderID = "orderID_example"; // String | Order ID
String origClOrdID = "origClOrdID_example"; // String | Client Order ID. See POST /order.
String clOrdID = "clOrdID_example"; // String | Optional new Client Order ID, requires `origClOrdID`.
Double simpleOrderQty = 3.4D; // Double | Optional order quantity in units of the underlying instrument (i.e. Bitcoin).
BigDecimal orderQty = new BigDecimal(); // BigDecimal | Optional order quantity in units of the instrument (i.e. contracts).
Double simpleLeavesQty = 3.4D; // Double | Optional leaves quantity in units of the underlying instrument (i.e. Bitcoin). Useful for amending partially filled orders.
BigDecimal leavesQty = new BigDecimal(); // BigDecimal | Optional leaves quantity in units of the instrument (i.e. contracts). Useful for amending partially filled orders.
Double price = 3.4D; // Double | Optional limit price for 'Limit', 'StopLimit', and 'LimitIfTouched' orders.
Double stopPx = 3.4D; // Double | Optional trigger price for 'Stop', 'StopLimit', 'MarketIfTouched', and 'LimitIfTouched' orders. Use a price below the current price for stop-sell orders and buy-if-touched orders.
Double pegOffsetValue = 3.4D; // Double | Optional trailing offset from the current price for 'Stop', 'StopLimit', 'MarketIfTouched', and 'LimitIfTouched' orders; use a negative offset for stop-sell orders and buy-if-touched orders. Optional offset from the peg price for 'Pegged' orders.
String text = "text_example"; // String | Optional amend annotation. e.g. 'Adjust skew'.
try {
    Order result = apiInstance.orderAmend(orderID, origClOrdID, clOrdID, simpleOrderQty, orderQty, simpleLeavesQty, leavesQty, price, stopPx, pegOffsetValue, text);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OrderApi#orderAmend");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orderID** | **String**| Order ID | [optional]
 **origClOrdID** | **String**| Client Order ID. See POST /order. | [optional]
 **clOrdID** | **String**| Optional new Client Order ID, requires &#x60;origClOrdID&#x60;. | [optional]
 **simpleOrderQty** | **Double**| Optional order quantity in units of the underlying instrument (i.e. Bitcoin). | [optional]
 **orderQty** | **BigDecimal**| Optional order quantity in units of the instrument (i.e. contracts). | [optional]
 **simpleLeavesQty** | **Double**| Optional leaves quantity in units of the underlying instrument (i.e. Bitcoin). Useful for amending partially filled orders. | [optional]
 **leavesQty** | **BigDecimal**| Optional leaves quantity in units of the instrument (i.e. contracts). Useful for amending partially filled orders. | [optional]
 **price** | **Double**| Optional limit price for &#39;Limit&#39;, &#39;StopLimit&#39;, and &#39;LimitIfTouched&#39; orders. | [optional]
 **stopPx** | **Double**| Optional trigger price for &#39;Stop&#39;, &#39;StopLimit&#39;, &#39;MarketIfTouched&#39;, and &#39;LimitIfTouched&#39; orders. Use a price below the current price for stop-sell orders and buy-if-touched orders. | [optional]
 **pegOffsetValue** | **Double**| Optional trailing offset from the current price for &#39;Stop&#39;, &#39;StopLimit&#39;, &#39;MarketIfTouched&#39;, and &#39;LimitIfTouched&#39; orders; use a negative offset for stop-sell orders and buy-if-touched orders. Optional offset from the peg price for &#39;Pegged&#39; orders. | [optional]
 **text** | **String**| Optional amend annotation. e.g. &#39;Adjust skew&#39;. | [optional]

### Return type

[**Order**](Order.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json, application/xml, text/xml, application/javascript, text/javascript

<a name="orderAmendBulk"></a>
# **orderAmendBulk**
> List&lt;Order&gt; orderAmendBulk(orders)

Amend multiple orders.

Similar to POST /amend, but with multiple orders. &#x60;application/json&#x60; only. Ratelimited at 50%.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OrderApi;


OrderApi apiInstance = new OrderApi();
String orders = "orders_example"; // String | An array of orders.
try {
    List<Order> result = apiInstance.orderAmendBulk(orders);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OrderApi#orderAmendBulk");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orders** | **String**| An array of orders. | [optional]

### Return type

[**List&lt;Order&gt;**](Order.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json, application/xml, text/xml, application/javascript, text/javascript

<a name="orderCancel"></a>
# **orderCancel**
> List&lt;Order&gt; orderCancel(orderID, clOrdID, text)

Cancel order(s). Send multiple order IDs to cancel in bulk.

Either an orderID or a clOrdID must be provided.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OrderApi;


OrderApi apiInstance = new OrderApi();
String orderID = "orderID_example"; // String | Order ID(s).
String clOrdID = "clOrdID_example"; // String | Client Order ID(s). See POST /order.
String text = "text_example"; // String | Optional cancellation annotation. e.g. 'Spread Exceeded'.
try {
    List<Order> result = apiInstance.orderCancel(orderID, clOrdID, text);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OrderApi#orderCancel");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orderID** | **String**| Order ID(s). | [optional]
 **clOrdID** | **String**| Client Order ID(s). See POST /order. | [optional]
 **text** | **String**| Optional cancellation annotation. e.g. &#39;Spread Exceeded&#39;. | [optional]

### Return type

[**List&lt;Order&gt;**](Order.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json, application/xml, text/xml, application/javascript, text/javascript

<a name="orderCancelAll"></a>
# **orderCancelAll**
> Object orderCancelAll(symbol, filter, text)

Cancels all of your orders.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OrderApi;


OrderApi apiInstance = new OrderApi();
String symbol = "symbol_example"; // String | Optional symbol. If provided, only cancels orders for that symbol.
String filter = "filter_example"; // String | Optional filter for cancellation. Use to only cancel some orders, e.g. `{\"side\": \"Buy\"}`.
String text = "text_example"; // String | Optional cancellation annotation. e.g. 'Spread Exceeded'
try {
    Object result = apiInstance.orderCancelAll(symbol, filter, text);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OrderApi#orderCancelAll");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **symbol** | **String**| Optional symbol. If provided, only cancels orders for that symbol. | [optional]
 **filter** | **String**| Optional filter for cancellation. Use to only cancel some orders, e.g. &#x60;{\&quot;side\&quot;: \&quot;Buy\&quot;}&#x60;. | [optional]
 **text** | **String**| Optional cancellation annotation. e.g. &#39;Spread Exceeded&#39; | [optional]

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json, application/xml, text/xml, application/javascript, text/javascript

<a name="orderCancelAllAfter"></a>
# **orderCancelAllAfter**
> Object orderCancelAllAfter(timeout)

Automatically cancel all your orders after a specified timeout.

Useful as a dead-man&#39;s switch to ensure your orders are canceled in case of an outage. If called repeatedly, the existing offset will be canceled and a new one will be inserted in its place.  Example usage: call this route at 15s intervals with an offset of 60000 (60s). If this route is not called within 60 seconds, all your orders will be automatically canceled.  This is also available via [WebSocket](https://www.bitmex.com/app/wsAPI#dead-man-s-switch-auto-cancel-). 

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OrderApi;


OrderApi apiInstance = new OrderApi();
Double timeout = 3.4D; // Double | Timeout in ms. Set to 0 to cancel this timer. 
try {
    Object result = apiInstance.orderCancelAllAfter(timeout);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OrderApi#orderCancelAllAfter");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **timeout** | **Double**| Timeout in ms. Set to 0 to cancel this timer.  |

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json, application/xml, text/xml, application/javascript, text/javascript

<a name="orderClosePosition"></a>
# **orderClosePosition**
> Order orderClosePosition(symbol, price)

Close a position. [Deprecated, use POST /order with execInst: &#39;Close&#39;]

If no &#x60;price&#x60; is specified, a market order will be submitted to close the whole of your position. This will also close all other open orders in this symbol.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OrderApi;


OrderApi apiInstance = new OrderApi();
String symbol = "symbol_example"; // String | Symbol of position to close.
Double price = 3.4D; // Double | Optional limit price.
try {
    Order result = apiInstance.orderClosePosition(symbol, price);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OrderApi#orderClosePosition");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **symbol** | **String**| Symbol of position to close. |
 **price** | **Double**| Optional limit price. | [optional]

### Return type

[**Order**](Order.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json, application/xml, text/xml, application/javascript, text/javascript

<a name="orderGetOrders"></a>
# **orderGetOrders**
> List&lt;Order&gt; orderGetOrders(symbol, filter, columns, count, start, reverse, startTime, endTime)

Get your orders.

To get open orders only, send {\&quot;open\&quot;: true} in the filter param.  See &lt;a href&#x3D;\&quot;http://www.onixs.biz/fix-dictionary/5.0.SP2/msgType_D_68.html\&quot;&gt;the FIX Spec&lt;/a&gt; for explanations of these fields.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OrderApi;


OrderApi apiInstance = new OrderApi();
String symbol = "symbol_example"; // String | Instrument symbol. Send a bare series (e.g. XBU) to get data for the nearest expiring contract in that series.  You can also send a timeframe, e.g. `XBU:monthly`. Timeframes are `daily`, `weekly`, `monthly`, `quarterly`, and `biquarterly`.
String filter = "filter_example"; // String | Generic table filter. Send JSON key/value pairs, such as `{\"key\": \"value\"}`. You can key on individual fields, and do more advanced querying on timestamps. See the [Timestamp Docs](https://www.bitmex.com/app/restAPI#timestamp-filters) for more details.
String columns = "columns_example"; // String | Array of column names to fetch. If omitted, will return all columns.  Note that this method will always return item keys, even when not specified, so you may receive more columns that you expect.
BigDecimal count = new BigDecimal(); // BigDecimal | Number of results to fetch.
BigDecimal start = new BigDecimal(); // BigDecimal | Starting point for results.
Boolean reverse = false; // Boolean | If true, will sort results newest first.
LocalDate startTime = new LocalDate(); // LocalDate | Starting date filter for results.
LocalDate endTime = new LocalDate(); // LocalDate | Ending date filter for results.
try {
    List<Order> result = apiInstance.orderGetOrders(symbol, filter, columns, count, start, reverse, startTime, endTime);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OrderApi#orderGetOrders");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **symbol** | **String**| Instrument symbol. Send a bare series (e.g. XBU) to get data for the nearest expiring contract in that series.  You can also send a timeframe, e.g. &#x60;XBU:monthly&#x60;. Timeframes are &#x60;daily&#x60;, &#x60;weekly&#x60;, &#x60;monthly&#x60;, &#x60;quarterly&#x60;, and &#x60;biquarterly&#x60;. | [optional]
 **filter** | **String**| Generic table filter. Send JSON key/value pairs, such as &#x60;{\&quot;key\&quot;: \&quot;value\&quot;}&#x60;. You can key on individual fields, and do more advanced querying on timestamps. See the [Timestamp Docs](https://www.bitmex.com/app/restAPI#timestamp-filters) for more details. | [optional]
 **columns** | **String**| Array of column names to fetch. If omitted, will return all columns.  Note that this method will always return item keys, even when not specified, so you may receive more columns that you expect. | [optional]
 **count** | **BigDecimal**| Number of results to fetch. | [optional] [default to 100]
 **start** | **BigDecimal**| Starting point for results. | [optional] [default to 0]
 **reverse** | **Boolean**| If true, will sort results newest first. | [optional] [default to false]
 **startTime** | **LocalDate**| Starting date filter for results. | [optional]
 **endTime** | **LocalDate**| Ending date filter for results. | [optional]

### Return type

[**List&lt;Order&gt;**](Order.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json, application/xml, text/xml, application/javascript, text/javascript

<a name="orderNew"></a>
# **orderNew**
> Order orderNew(symbol, side, simpleOrderQty, quantity, orderQty, price, displayQty, stopPrice, stopPx, clOrdID, clOrdLinkID, pegOffsetValue, pegPriceType, type, ordType, timeInForce, execInst, contingencyType, text)

Create a new order.

This endpoint is used for placing orders. Valid order types are Market, Limit, Stop, StopLimit, MarketIfTouched, LimitIfTouched, MarketWithLeftOverAsLimit, and Pegged.  If no order type is provided, BitMEX will assume &#39;Limit&#39;. Be very careful with &#39;Market&#39; and &#39;Stop&#39; orders as you may be filled at an unfavourable price.  You can submit bulk orders by POSTing an array of orders to &#x60;/api/v1/order/bulk&#x60;. Send a JSON payload with the shape: &#x60;{\&quot;orders\&quot;: [{...}, {...}]}&#x60;, with each inner object containing the same fields that would be sent to this endpoint.  A note on API tools: if you want to keep track of order IDs yourself, set a unique clOrdID per order. This clOrdID will come back as a property on the order and any related executions (including on the WebSocket), and can be used to get or cancel the order. Max length is 36 characters.  To generate a clOrdID, consider setting a prefix, and incrementing a counter or generating a UUID. Some UUIDs are longer than 36 characters, so use a url-safe base64 encoding. For example, the prefix &#x60;&#39;bmex_mm_&#39;&#x60; and the UUID &#x60;&#39;7fbd6545-bb0c-11e4-a273-6003088a7c04&#39;&#x60; creates &#x60;&#39;bmex_mm_f71lRbsMEeSic2ADCIp8BA&#39;&#x60;.  See the [BitMEX Reference Market Maker](https://github.com/BitMEX/market-maker/blob/22c75a2b6db63e20212813e9afdb845db1b09b2a/bitmex.py#L152) for an example of how to use and generate clOrdIDs. 

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OrderApi;


OrderApi apiInstance = new OrderApi();
String symbol = "symbol_example"; // String | Instrument symbol. e.g. 'XBT24H'.
String side = "side_example"; // String | Order side. Valid options: Buy, Sell. Defaults to 'Buy' unless `orderQty` or `simpleOrderQty` is negative.
Double simpleOrderQty = 3.4D; // Double | Order quantity in units of the underlying instrument (i.e. Bitcoin).
BigDecimal quantity = new BigDecimal(); // BigDecimal | Deprecated: use `orderQty`.
BigDecimal orderQty = new BigDecimal(); // BigDecimal | Order quantity in units of the instrument (i.e. contracts).
Double price = 3.4D; // Double | Optional limit price for 'Limit', 'StopLimit', and 'LimitIfTouched' orders.
BigDecimal displayQty = new BigDecimal(); // BigDecimal | Optional quantity to display in the book. Use 0 for a hidden order.
Double stopPrice = 3.4D; // Double | Deprecated: use `stopPx`.
Double stopPx = 3.4D; // Double | Optional trigger price for 'Stop', 'StopLimit', 'MarketIfTouched', and 'LimitIfTouched' orders. Use a price below the current price for stop-sell orders and buy-if-touched orders. Use `execInst` of 'MarkPrice' or 'LastPrice' to define the current price used for triggering.
String clOrdID = "clOrdID_example"; // String | Optional Client Order ID. This clOrdID will come back on the order and any related executions.
String clOrdLinkID = "clOrdLinkID_example"; // String | Optional Client Order Link ID for contingent orders.
Double pegOffsetValue = 3.4D; // Double | Optional trailing offset from the current price for 'Stop', 'StopLimit', 'MarketIfTouched', and 'LimitIfTouched' orders; use a negative offset for stop-sell orders and buy-if-touched orders. Optional offset from the peg price for 'Pegged' orders.
String pegPriceType = "pegPriceType_example"; // String | Optional peg price type. Valid options: LastPeg, MidPricePeg, MarketPeg, PrimaryPeg, TrailingStopPeg, TrailingStopPeg.
String type = "type_example"; // String | Deprecated: use `ordType`.
String ordType = "Limit"; // String | Order type. Valid options: Market, Limit, Stop, StopLimit, MarketIfTouched, LimitIfTouched, MarketWithLeftOverAsLimit, Pegged. Defaults to 'Limit' when `price` is specified. Defaults to 'Stop' when `stopPx` is specified. Defaults to 'StopLimit' when `price` and `stopPx` are specified.
String timeInForce = "timeInForce_example"; // String | Time in force. Valid options: Day, GoodTillCancel, ImmediateOrCancel, FillOrKill. Defaults to 'GoodTillCancel' for 'Limit', 'StopLimit', 'LimitIfTouched', and 'MarketWithLeftOverAsLimit' orders.
String execInst = "execInst_example"; // String | Optional execution instructions. Valid options: ParticipateDoNotInitiate, AllOrNone, MarkPrice, IndexPrice, LastPrice, Close, ReduceOnly, Fixed. 'AllOrNone' instruction requires `displayQty` to be 0. 'MarkPrice' or 'LastPrice' instruction valid for 'Stop', 'StopLimit', 'MarketIfTouched', and 'LimitIfTouched' orders.
String contingencyType = "contingencyType_example"; // String | Optional contingency type for use with `clOrdLinkID`. Valid options: OneCancelsTheOther, OneTriggersTheOther, OneUpdatesTheOtherAbsolute, OneUpdatesTheOtherProportional.
String text = "text_example"; // String | Optional order annotation. e.g. 'Take profit'.
try {
    Order result = apiInstance.orderNew(symbol, side, simpleOrderQty, quantity, orderQty, price, displayQty, stopPrice, stopPx, clOrdID, clOrdLinkID, pegOffsetValue, pegPriceType, type, ordType, timeInForce, execInst, contingencyType, text);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OrderApi#orderNew");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **symbol** | **String**| Instrument symbol. e.g. &#39;XBT24H&#39;. |
 **side** | **String**| Order side. Valid options: Buy, Sell. Defaults to &#39;Buy&#39; unless &#x60;orderQty&#x60; or &#x60;simpleOrderQty&#x60; is negative. | [optional]
 **simpleOrderQty** | **Double**| Order quantity in units of the underlying instrument (i.e. Bitcoin). | [optional]
 **quantity** | **BigDecimal**| Deprecated: use &#x60;orderQty&#x60;. | [optional]
 **orderQty** | **BigDecimal**| Order quantity in units of the instrument (i.e. contracts). | [optional]
 **price** | **Double**| Optional limit price for &#39;Limit&#39;, &#39;StopLimit&#39;, and &#39;LimitIfTouched&#39; orders. | [optional]
 **displayQty** | **BigDecimal**| Optional quantity to display in the book. Use 0 for a hidden order. | [optional]
 **stopPrice** | **Double**| Deprecated: use &#x60;stopPx&#x60;. | [optional]
 **stopPx** | **Double**| Optional trigger price for &#39;Stop&#39;, &#39;StopLimit&#39;, &#39;MarketIfTouched&#39;, and &#39;LimitIfTouched&#39; orders. Use a price below the current price for stop-sell orders and buy-if-touched orders. Use &#x60;execInst&#x60; of &#39;MarkPrice&#39; or &#39;LastPrice&#39; to define the current price used for triggering. | [optional]
 **clOrdID** | **String**| Optional Client Order ID. This clOrdID will come back on the order and any related executions. | [optional]
 **clOrdLinkID** | **String**| Optional Client Order Link ID for contingent orders. | [optional]
 **pegOffsetValue** | **Double**| Optional trailing offset from the current price for &#39;Stop&#39;, &#39;StopLimit&#39;, &#39;MarketIfTouched&#39;, and &#39;LimitIfTouched&#39; orders; use a negative offset for stop-sell orders and buy-if-touched orders. Optional offset from the peg price for &#39;Pegged&#39; orders. | [optional]
 **pegPriceType** | **String**| Optional peg price type. Valid options: LastPeg, MidPricePeg, MarketPeg, PrimaryPeg, TrailingStopPeg, TrailingStopPeg. | [optional]
 **type** | **String**| Deprecated: use &#x60;ordType&#x60;. | [optional]
 **ordType** | **String**| Order type. Valid options: Market, Limit, Stop, StopLimit, MarketIfTouched, LimitIfTouched, MarketWithLeftOverAsLimit, Pegged. Defaults to &#39;Limit&#39; when &#x60;price&#x60; is specified. Defaults to &#39;Stop&#39; when &#x60;stopPx&#x60; is specified. Defaults to &#39;StopLimit&#39; when &#x60;price&#x60; and &#x60;stopPx&#x60; are specified. | [optional] [default to Limit]
 **timeInForce** | **String**| Time in force. Valid options: Day, GoodTillCancel, ImmediateOrCancel, FillOrKill. Defaults to &#39;GoodTillCancel&#39; for &#39;Limit&#39;, &#39;StopLimit&#39;, &#39;LimitIfTouched&#39;, and &#39;MarketWithLeftOverAsLimit&#39; orders. | [optional]
 **execInst** | **String**| Optional execution instructions. Valid options: ParticipateDoNotInitiate, AllOrNone, MarkPrice, IndexPrice, LastPrice, Close, ReduceOnly, Fixed. &#39;AllOrNone&#39; instruction requires &#x60;displayQty&#x60; to be 0. &#39;MarkPrice&#39; or &#39;LastPrice&#39; instruction valid for &#39;Stop&#39;, &#39;StopLimit&#39;, &#39;MarketIfTouched&#39;, and &#39;LimitIfTouched&#39; orders. | [optional]
 **contingencyType** | **String**| Optional contingency type for use with &#x60;clOrdLinkID&#x60;. Valid options: OneCancelsTheOther, OneTriggersTheOther, OneUpdatesTheOtherAbsolute, OneUpdatesTheOtherProportional. | [optional]
 **text** | **String**| Optional order annotation. e.g. &#39;Take profit&#39;. | [optional]

### Return type

[**Order**](Order.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json, application/xml, text/xml, application/javascript, text/javascript

<a name="orderNewBulk"></a>
# **orderNewBulk**
> List&lt;Order&gt; orderNewBulk(orders)

Create multiple new orders.

This endpoint is used for placing bulk orders. Valid order types are Market, Limit, Stop, StopLimit, MarketIfTouched, LimitIfTouched, MarketWithLeftOverAsLimit, and Pegged.  Each individual order object in the array should have the same properties as an individual POST /order call.  This endpoint is much faster for getting many orders into the book at once. Because it reduces load on BitMEX systems, this endpoint is ratelimited at &#x60;ceil(0.5 * orders)&#x60;. Submitting 10 orders via a bulk order call will only count as 5 requests.  For now, only &#x60;application/json&#x60; is supported on this endpoint. 

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OrderApi;


OrderApi apiInstance = new OrderApi();
String orders = "orders_example"; // String | An array of orders.
try {
    List<Order> result = apiInstance.orderNewBulk(orders);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OrderApi#orderNewBulk");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orders** | **String**| An array of orders. | [optional]

### Return type

[**List&lt;Order&gt;**](Order.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, application/x-www-form-urlencoded
 - **Accept**: application/json, application/xml, text/xml, application/javascript, text/javascript

