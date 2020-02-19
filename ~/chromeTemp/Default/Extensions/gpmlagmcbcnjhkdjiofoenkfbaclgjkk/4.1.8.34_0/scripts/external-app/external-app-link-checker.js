// Copyright (c) 2018 Bromium, Inc.
// Use of the Bromium, Inc. software requires a license agreement with Bromium, Inc. or an authorized reseller.

params.delete('extensionID');
params.delete('browser');
target = scheme + extid + '/external-app-link-page-v1.html?' + params.toString();
