@include('partials.header')
@include('partials.nav_orizz')
@include('partials.aside')

<div class="app-content"> <!--begin::Container-->
    <div class="container-fluid"> <!--begin::Row-->
        @yield('content')
    </div>
</div>

@include('partials.footer')
