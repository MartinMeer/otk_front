- I reviewed both pages and the service layer to produce a concise backend reference.

### API reference for backenders

- Base URL: `https://api.otk-help.martinmeer.com`
- Headers: `Content-Type: application/json`
- Error behavior: On non-2xx the frontend reads the response as text and shows/throws it. Please return a clear plain-text error message with an appropriate status code.

### Endpoint: OST 1 00022-80 (Unspecified tolerances)
- Frontend file: `src/pages/OST22Calculator.tsx`
- HTTP method: POST
- Path: `/ost22`
- Request body:
```json
{ "inputString": "<elementType>:<size>" }
```
- Parameters:
  - elementType: one of `"hole" | "shaft" | "quasi_hole" | "quasi_shaft" | "undef"`
  - size: decimal string with dot as separator, e.g. `"10.5"` (frontend validates against `^\d+(\.\d+)?$`)
- Example:
```json
{ "inputString": "hole:10.5" }
```
- Response body (all strings):
```json
{
  "upper_deviance": "<string>",
  "lower_deviance": "<string>",
  "max_mes_value": "<string>",
  "min_mes_value": "<string>"
}
```
- Notes:
  - Values represent mm; UI appends “мм”. Please return raw numeric strings without units.
  - Invalid `elementType` or malformed size should return 400 with a plain-text reason.

### Endpoint: GOST 25347-82 (Tolerances and fits)
- Frontend file: `src/pages/Esdp.tsx`
- HTTP method: POST
- Path: `/esdp`
- Request body:
```json
{ "inputString": "<nominal><tolerance>" }
```
- Input format:
  - Free-form string like `"18.12H7"`, `"18h6"`, etc. (UI accepts text; no numeric-only constraint)
- Example:
```json
{ "inputString": "18.12H7" }
```
- Response body (all strings):
```json
{
  "upper_deviance": "<string>",
  "lower_deviance": "<string>",
  "max_mes_value": "<string>",
  "min_mes_value": "<string>"
}
```
- Notes:
  - Same display expectations as above (values in mm, returned as strings without units).
  - Empty input is blocked client-side; malformed formats should return 400 with a plain-text message.

### Error responses
- Use meaningful HTTP status codes (400 for validation errors, 500 for server errors).
- Body should be plain text (the frontend reads `response.text()` on error).

- Both pages call only POST `/ost22` and POST `/esdp`.
- Requests use `{ "inputString": ... }`; responses must include the four snake_case fields as strings.