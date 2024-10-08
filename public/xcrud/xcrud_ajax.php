<?php
/**
 * Techbase Solutions (K) Commercial License
 *
 * This software is licensed under the Techbase Solutions (K) Extended License as attached with this software
 * You should have received a copy of the license along with this file. If not,
 * please contact Techbase Solutions (K) at xcrud17@gmail.com for a copy.
 *
 * Commercial use of this software is permitted only under the terms of the
 * Techbase Solutions (K) Commercial License. Redistributions and use in source
 * and binary forms, with or without modification, are strictly prohibited
 * unless explicitly granted by the Techbase Solutions (K) Commercial License.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * DO NOT REMOVE THIS LICENSE INFORMATION
 *
 * @copyright 2023 Techbase Solutions (K)
 * @license   https://xcrud.net
 * @email   xcrud17@gmail.com
 */
 ?>
<?php include ('xcrud.php');
header('Content-Type: text/html; charset=' . Xcrud_config::$mbencoding);
echo Xcrud::get_requested_instance();
