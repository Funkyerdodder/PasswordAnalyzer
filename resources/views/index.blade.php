@extends('layout')


@section('content')
<div class="container-fluid">
    <div class="col-xs-8 col-xs-offset-2" id="divForm">
        <div class="row">
            <h1 class="text-center">Password Analyzer</h1>
        </div>
        <div class="row">
            <form id="formPassword">
                <div class="form-group">
                    <input type="password" class="form-control" name="password" placeholder="Password">
                    <span class="help-block text-center"></span>
                </div>
                <button type="submit" disabled class="btn btn-default col-xs-12" id="btnSubmit">Submit</button>
            </form>
        </div>
    </div>
</div>

@endsection

@section('script')
    <script src="{{ asset('js/submit.js') }}"></script>
@endsection