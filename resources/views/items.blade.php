<!DOCTYPE html>
<html>
<head>
    <title>Items</title>
</head>
<body>
    <h1>Items</h1>
    <ul>
        @foreach($items as $item)
            <li>
                <h2>{{ $item->name }}</h2>
                <p>Price: ${{ $item->price }}</p>
                <p>Quantity: {{ $item->quantity }}</p>
            </li>
        @endforeach
    </ul>
</body>
</html>
